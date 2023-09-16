import checkData from "../config/checkData.js";
import Blogs from "../models/blogModel.js";
import Admins from "../models/adminModel.js";
import Users from "../models/userModel.js";
import Likes from "../models/likeModel.js";
import Categories from "../models/categoryModel.js";
import Views from "../models/viewModel.js";
import Comments from "../models/commentModel.js";

const blogCtrl = {
  // none auth
  searchBlog: async (req, res) => {
    try {
      const blogs = await Blogs.aggregate([
        {
          $search: {
            index: "searchBlog",
            autocomplete: {
              query: `${req.query.search}`,
              path: "title",
            },
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 5 },
        {
          $project: {
            title: 1,
            description: 1,
            thumbnail: 1,
            createdAt: 1,
          },
        },
      ]);

      if (blogs.length < 1) return res.json({ msg: "No Blogs." });

      return res.status(200).json(blogs);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  increaseShare: async (req, res) => {
    try {
      const { idBlog } = req.params;
      const blog = await Blogs.findById(idBlog);
      if (!blog) return res.json({ msg: "Blog not found" });

      blog.share += 1;
      await blog.save();

      return res.status(200).json({ msg: "Increased share" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // auth
  getBlog: async (req, res) => {
    try {
      const { idBlog } = req.params;
      const blog = await Blogs.findById(idBlog).select("-report -__v");
      if (!blog) return res.json({ msg: "Blog not found" });

      const likes = await Likes.count({
        idBlog: blog._id,
        like: true,
      });
      const dislikes = await Likes.count({
        idBlog: blog._id,
        like: false,
      });

      const comments = await Comments.count({
        idBlog: blog._id,
      });

      const { view, viewMonthly } = await Views.findOne({ idBlog: blog._id });

      return res.status(200).json({ ...blog._doc, likes, dislikes, comments, views: view, viewMonthly });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const { idBlog } = req.params;

      const ownerBlog = await Blogs.findOne({ _id: idBlog });
      const isAdmin = await Admins.findOne({ _id: req.user.id });

      if (ownerBlog.idUser !== req.user.id && !isAdmin) {
        return res.json({ msg: "You are not owner" });
      }
      const blog = await Blogs.findOneAndDelete({ _id: idBlog });
      if (!blog) return res.json({ msg: "Blog not found" });

      await Views.findByIdAndDelete({ _id: idBlog });

      return res.status(200).json({ msg: "Blog deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // user
  listBlogs: async (req, res) => {
    try {
      const countBlogs = await Blogs.count();
      const allBlogs = await Blogs.find({
        status: "normal",
      }).select("-report -status -content");

      let blogs = await Promise.all(
        allBlogs.map(async (blog) => {
          const category = await Categories.findById(blog.category);

          const likes = await Likes.count({
            idBlog: blog._id,
            like: true,
          });
          const dislikes = await Likes.count({
            idBlog: blog._id,
            like: false,
          });
          const views = await Views.findOne({ idBlog: blog._id });

          return { ...blog._doc, category: category.name, likes, dislikes, views: views.view };
        })
      );

      blogs = blogs.filter((n) => n.length !== 0).flat(); // remove empty array and [[value], [value, value]] -> [value, value]

      if (countBlogs === 0) {
        return res.status(200).json({ msg: "Not have any blog" });
      }

      blogs.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      return res.status(200).json(blogs);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  listFriendsBlogs: async (req, res) => {
    try {
      const user = await Users.findOne({ _id: req.user.id });
      const friendsIds = user.friends;
      if (friendsIds.length === 0) return res.status(200).json({ msg: "You have no friend" });

      const listBlogs = await Promise.all(
        friendsIds.map(async (friendId) => {
          const allBlogs = await Blogs.find({
            idUser: friendId,
            status: "normal",
          }).select("-report -status -content");

          let blogs = await Promise.all(
            allBlogs.map(async (blog) => {
              const category = await Categories.findById(blog.category);

              const likes = await Likes.count({
                idBlog: blog._id,
                like: true,
              });
              const dislikes = await Likes.count({
                idBlog: blog._id,
                like: false,
              });
              const views = await Views.findOne({ idBlog: blog._id });

              return { ...blog._doc, category: category.name, likes, dislikes, views: views.view };
            })
          );

          return blogs;
        })
      ); // [[{blog}, ...]]

      const allBlogs = [];
      for (const friendBlogs of listBlogs) {
        allBlogs.push(...friendBlogs);
      } // [{blog}, ...]

      allBlogs.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      return res.status(200).json(allBlogs);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createBlog: async (req, res) => {
    try {
      const idUser = req.user.id;
      const valid = checkData(req.body, "title", "content", "thumbnail", "description", "category");

      if (valid !== true) return res.json({ valid });
      const newBlog = new Blogs({ idUser, ...req.body });
      await newBlog.save();

      const newView = new Views({ idBlog: newBlog._id });
      await newView.save();

      return res.status(200).json({ msg: "Create blog successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateBlog: async (req, res) => {
    try {
      const { idBlog } = req.params;

      const ownerBlog = await Blogs.findOne({ _id: idBlog });
      if (ownerBlog.idUser !== req.user.id) return res.json({ msg: "You are not owner" });

      const blog = await Blogs.findOneAndUpdate({ _id: idBlog }, { ...req.body }, { new: true });

      return blog
        ? res.status(200).json({ msg: "The information blog has change" })
        : res.json({ msg: "Blog not found" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // permit
  listBlogsAdmin: async (req, res) => {
    try {
      const countBlogs = await Blogs.count();
      const listBlogs = await Blogs.find({});

      if (countBlogs === 0) {
        return res.status(200).json({ msg: "Not have any blog" });
      } else {
        return res.status(200).json(listBlogs);
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  statusBlog: async (req, res) => {
    try {
      const { idBlog } = req.params;

      const blog = await Blogs.findOneAndUpdate(
        { _id: idBlog },
        { status: req.body.status },
        { new: true }
      );

      return blog
        ? res.status(200).json({ msg: "Status blog has change" })
        : res.json({ msg: "Blog not found" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default blogCtrl;
