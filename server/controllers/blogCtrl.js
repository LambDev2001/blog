import checkData from "../config/checkData.js";
import Blogs from "../models/blogModel.js";
import Admins from "../models/adminModel.js";
import Users from "../models/userModel.js";
import Likes from "../models/likeModel.js";
import Categories from "../models/categoryModel.js";

const blogCtrl = {
  createBlog: async (req, res) => {
    try {
      const idUser = req.user.id;
      const valid = checkData(req.body, "title", "content", "thumbnail", "description", "category");

      if (valid !== true) return res.status(400).json({ valid });
      const newBlog = new Blogs({ idUser, ...req.body });
      await newBlog.save();

      return res.status(200).json({ msg: "Create blog successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  statusBlog: async (req, res) => {
    try {
      const idBlog = req.params.id;
      const data = checkData(req.body, "status");
      if (data !== true) return res.status(400).json({ data });

      const blog = await Blogs.findOneAndUpdate(
        { _id: idBlog },
        { status: req.body.status },
        { new: true }
      );

      return blog
        ? res.status(200).json({ msg: "Status blog has change" })
        : res.status(400).json({ msg: "Blog not found" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateBlog: async (req, res) => {
    try {
      const idBlog = req.params.id;

      const ownerBlog = await Blogs.findOne({ _id: idBlog });
      if (ownerBlog.idUser !== req.user.id)
        return res.status(400).json({ msg: "You are not owner" });

      const blog = await Blogs.findOneAndUpdate({ _id: idBlog }, { ...req.body }, { new: true });

      return blog
        ? res.status(200).json({ msg: "The information blog has change" })
        : res.status(400).json({ msg: "Blog not found" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const idBlog = req.params.id;

      const ownerBlog = await Blogs.findOne({ _id: idBlog });
      const isAdmin = await Admins.findOne({ _id: req.user.id });

      if (ownerBlog.idUser !== req.user.id && !isAdmin) {
        return res.status(400).json({ msg: "You are not owner" });
      }

      const blog = await Blogs.findOneAndDelete({ _id: idBlog });

      return blog
        ? res.status(200).json({ msg: "The information blog has change" })
        : res.status(400).json({ msg: "Blog not found" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  listBlogs: async (req, res) => {
    try {
      const countBlogs = await Blogs.count();
      const listCategories = await Categories.find({});
      let listBlogs = await Promise.all(
        listCategories.map(async (category) => {
          const blogs = await Blogs.find({ status: "normal", category: category._id }).limit(10);

          if (blogs.length > 0) {
            blogs.map((blog) => (blog.category = category.name));
          }
          return blogs;
        })
      );
      listBlogs = listBlogs.filter((n) => n.length !== 0).flat(); // remove empty array and [[value], [value, value]] -> [value, value]

      const listIdBlogs = await Promise.all(
        listBlogs.map(async (blog) => {
          const countLikes = await Likes.count({
            idBlog: blog._id,
            like: true,
          });
          const countDislikes = await Likes.count({
            idBlog: blog._id,
            like: false,
          });

          const newBlog = new Object({...blog._doc, likes: countLikes, dislikes: countDislikes});
          
          return newBlog;
        })
      );

      if (countBlogs === 0) {
        return res.status(200).json({ msg: "Not have any blog" });
      } else {
        listIdBlogs.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
        return res.status(200).json(listIdBlogs);
      }
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
          const friendBlogs = await Blogs.find({
            idUser: friendId,
            status: "normal",
          });
          return friendBlogs;
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

  listBlogsAdmin: async (req, res) => {
    try {
      const countBlogs = await Blogs.count();
      const listBlogs = await Blogs.find({});

      if (countBlogs === 0) {
        return res.status(200).json({ msg: "Not have any blog" });
      } else {
        return res.status(200).json({ listBlogs });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  increaseView: async (req, res) => {
    try {
      const idBlog = req.params.id;
      const blog = await Blogs.findById(idBlog);

      blog.view++;
      await blog.save();

      return res.status(200).json({ msg: "increased view" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default blogCtrl;
