import checkData from "../config/checkData.js";
import Blogs from "../models/blogModel.js";
import Admins from "../models/adminModel.js";
import Users from "../models/userModel.js";
import Likes from "../models/likeModel.js";
import Categories from "../models/categoryModel.js";
import Views from "../models/viewModel.js";
import Comments from "../models/commentModel.js";
import Reports from "../models/reportModel.js";

const blogCtrl = {
  // none auth
  searchBlog: async (req, res) => {
    try {
      const blogs = await Blogs.find({
        title: { $regex: new RegExp(req.query.search), $options: "i" },
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title description thumbnail createdAt");

      return res.status(200).json(blogs);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getBlogsByCategory: async (req, res) => {
    try {
      const { idCategory } = req.params;

      const categoryCheck = await Categories.findById(idCategory).select("-__v");
      if (!categoryCheck) return res.json({ err: "Category not found" });

      const blogs = await Blogs.find({ category: idCategory }).select("-__v");

      if (blogs.length < 1) return res.status(200).json({ nameCategory: categoryCheck, blogs: [] });

      const result = await Promise.all(
        blogs.map(async (blog) => {
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

          const category = await Categories.findOne({
            _id: blog.category,
          });

          const author = await Users.findById(blog.idUser).select(
            "-__v -password -createdAt -updatedAt -status -friends -report"
          );

          return {
            ...blog._doc,
            category: category.name,
            likes,
            dislikes,
            comments,
            views: view,
            viewMonthly,
            author,
          };
        })
      );

      return res.status(200).json({ nameCategory: categoryCheck, blogs: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  getPopularBlogs: async (req, res) => {
    try {
      const blogs = await Blogs.find().select("-__v");
      const result = await Promise.all(
        blogs.map(async (blog) => {
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

          const category = await Categories.findOneWithDeleted({
            _id: blog.category,
          });

          const author = await Users.findById(blog.idUser).select(
            "-__v -password -createdAt -updatedAt -status -friends -report"
          );

          return {
            ...blog._doc,
            category: category.name,
            likes,
            dislikes,
            comments,
            views: view,
            viewMonthly,
            author,
            idCategory: category._id,
          };
        })
      );

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  increaseShare: async (req, res) => {
    try {
      const { idBlog } = req.params;

      let blog = await Blogs.findById(idBlog);
      if (!blog) return res.json({ err: "Blog not found" });

      blog.share += 1;
      await blog.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  listUnauthorizedBlogs: async (req, res) => {
    try {
      const countBlogs = await Blogs.count();
      const allBlogs = await Blogs.find({}).select("-report -status -content");

      let blogs = await Promise.all(
        allBlogs.map(async (blog) => {
          const author = await Users.findById(blog.idUser).select(
            "-password -__v -report -status -friends"
          );

          const category = await Categories.findOneWithDeleted(blog.category);

          const likes = await Likes.count({
            idBlog: blog._id,
            like: true,
          });

          const dislikes = await Likes.count({
            idBlog: blog._id,
            like: false,
          });

          const views = await Views.findOne({ idBlog: blog._id });

          let comments = await Comments.count({
            idBlog: blog._id,
          });

          const isLike = { like: null };
          const isFollowing = false;
          return {
            ...blog._doc,
            author,
            category: category.name,
            likes,
            dislikes,
            views: views.view,
            comments,
            isLike: isLike.like,
            isFollowing: isFollowing ? true : false,
          };
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
      console.log(err);

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

      const category = await Categories.findOneWithDeleted({
        _id: blog.category,
      });

      const author = await Users.findById(blog.idUser).select(
        "-__v -password -createdAt -updatedAt -status -friends -report"
      );

      return res.status(200).json({
        ...blog._doc,
        author,
        likes,
        dislikes,
        comments,
        views: view,
        viewMonthly,
        category: category._id,
        nameCategory: category.name,
      });
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
      const comments = await Comments.find({ idBlog: idBlog });

      const blog = await Blogs.delete({ _id: idBlog });
      if (!blog) return res.json({ msg: "Blog not found" });

      const reports = await Promise.all(
        await comments.map(async (comment) => {
          const report = await Reports.findOne({ ids: comment._id });
          return report._id;
        })
      );
      reports.map(async (report) => {
        await Reports.findByIdAndDelete({ _id: report });
      })
      await Likes.delete({ idBlog: idBlog });
      await Comments.delete({ idBlog: idBlog });
      await Views.delete({ idBlog: idBlog });

      return res.status(200).json({ msg: "Blog deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // user
  listBlogs: async (req, res) => {
    try {
      const countBlogs = await Blogs.count();
      const allBlogs = await Blogs.find({}).select("-report -status -content");

      let blogs = await Promise.all(
        allBlogs.map(async (blog) => {
          const author = await Users.findById(blog.idUser).select(
            "-password -__v -report -status -friends"
          );

          const category = await Categories.findOneWithDeleted({ _id: blog.category });

          const likes = await Likes.count({
            idBlog: blog._id,
            like: true,
          });

          const dislikes = await Likes.count({
            idBlog: blog._id,
            like: false,
          });

          const views = await Views.findOne({ idBlog: blog._id });

          let comments = await Comments.count({
            idBlog: blog._id,
          });

          let isLike = await Likes.findOne({
            idBlog: blog._id,
            idUser: req.user.id,
          });

          if (!isLike) isLike = { like: null };

          const isFollowing = await Users.findOne({
            _id: req.user.id,
            following: author._id,
          });

          return {
            ...blog._doc,
            author,
            category: category.name,
            likes,
            dislikes,
            views: views.view,
            comments,
            isLike: isLike.like,
            isFollowing: isFollowing ? true : false,
          };
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
      console.log(err);

      return res.status(500).json({ msg: err.message });
    }
  },

  myBlogs: async (req, res) => {
    try {
      const countBlogs = await Blogs.count();
      const allBlogs = await Blogs.find({ idUser: req.user.id }).select("-report -status -content");

      let blogs = await Promise.all(
        allBlogs.map(async (blog) => {
          const author = await Users.findById(blog.idUser).select(
            "-password -__v -report -status -friends"
          );

          const category = await Categories.findOneWithDeleted({ _id: blog.category });

          const likes = await Likes.count({
            idBlog: blog._id,
            like: true,
          });

          const dislikes = await Likes.count({
            idBlog: blog._id,
            like: false,
          });

          const views = await Views.findOne({ idBlog: blog._id });

          let comments = await Comments.count({
            idBlog: blog._id,
          });

          let isLike = await Likes.findOne({
            idBlog: blog._id,
            idUser: req.user.id,
          });

          if (!isLike) isLike = { like: null };

          const isFollowing = await Users.findOne({
            _id: req.user.id,
            following: author._id,
          });

          return {
            ...blog._doc,
            author,
            category: category.name,
            likes,
            dislikes,
            views: views.view,
            comments,
            isLike: isLike.like,
            isFollowing: isFollowing ? true : false,
          };
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
      console.log(err);

      return res.status(500).json({ msg: err.message });
    }
  },

  otherUserBlogs: async (req, res) => {
    try {
      const { idUser } = req.params;
      const countBlogs = await Blogs.count();
      const allBlogs = await Blogs.find({ idUser }).select("-report -content");

      let blogs = await Promise.all(
        allBlogs.map(async (blog) => {
          const author = await Users.findById(blog.idUser).select(
            "-password -__v -report -status -friends"
          );

          const category = await Categories.findOneWithDeleted({ _id: blog.category });

          const likes = await Likes.count({
            idBlog: blog._id,
            like: true,
          });

          const dislikes = await Likes.count({
            idBlog: blog._id,
            like: false,
          });

          const views = await Views.findOne({ idBlog: blog._id });

          let comments = await Comments.count({
            idBlog: blog._id,
          });

          let isLike = await Likes.findOne({
            idBlog: blog._id,
            idUser: req.user.id,
          });

          if (!isLike) isLike = { like: null };

          const isFollowing = await Users.findOne({
            _id: req.user.id,
            following: author._id,
          });

          return {
            ...blog._doc,
            author,
            category: category.name,
            likes,
            dislikes,
            views: views.view,
            comments,
            isLike: isLike.like,
            isFollowing: isFollowing ? true : false,
          };
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
      console.log(err);

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
          }).select("-report -status -content");

          let blogs = await Promise.all(
            allBlogs.map(async (blog) => {
              const author = await Users.findById(blog.idUser).select(
                "-password -__v -report -status -friends"
              );

              const category = await Categories.findOneWithDeleted({ _id: blog.category });

              const likes = await Likes.count({
                idBlog: blog._id,
                like: true,
              });

              const dislikes = await Likes.count({
                idBlog: blog._id,
                like: false,
              });

              const views = await Views.findOne({ idBlog: blog._id });

              let comments = await Comments.count({
                idBlog: blog._id,
              });

              let isLike = await Likes.findOne({
                idBlog: blog._id,
                idUser: req.user.id,
              });

              if (!isLike) isLike = { like: null };

              const isFollowing = await Users.findOne({
                _id: req.user.id,
                following: author._id,
              });

              return {
                ...blog._doc,
                author,
                category: category.name,
                likes,
                dislikes,
                views: views.view,
                comments,
                isLike: isLike.like,
                isFollowing: isFollowing ? true : false,
              };
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

  listFollowingBlogs: async (req, res) => {
    try {
      const user = await Users.findOne({ _id: req.user.id });
      const followingIds = user.following;
      if (followingIds.length === 0) return res.status(200).json({ msg: "You have no following" });

      const listBlogs = await Promise.all(
        followingIds.map(async (friendId) => {
          const allBlogs = await Blogs.find({
            idUser: friendId,
          }).select("-report -status -content");

          let blogs = await Promise.all(
            allBlogs.map(async (blog) => {
              const author = await Users.findById(blog.idUser).select(
                "-password -__v -report -status -friends"
              );

              const category = await Categories.findOneWithDeleted({ _id: blog.category });

              const likes = await Likes.count({
                idBlog: blog._id,
                like: true,
              });

              const dislikes = await Likes.count({
                idBlog: blog._id,
                like: false,
              });

              const views = await Views.findOne({ idBlog: blog._id });

              let comments = await Comments.count({
                idBlog: blog._id,
              });

              let isLike = await Likes.findOne({
                idBlog: blog._id,
                idUser: req.user.id,
              });

              if (!isLike) isLike = { like: null };

              const isFollowing = await Users.findOne({
                _id: req.user.id,
                following: author._id,
              });

              return {
                ...blog._doc,
                author,
                category: category.name,
                likes,
                dislikes,
                views: views.view,
                comments,
                isLike: isLike.like,
                isFollowing: isFollowing ? true : false,
              };
            })
          );

          return blogs;
        })
      ); // [[{blog}, ...]]

      const allBlogs = [];
      for (const followingBlogs of listBlogs) {
        allBlogs.push(...followingBlogs);
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
      console.log(err);
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
      const listBlogs = await Blogs.find({}).sort({ createdAt: -1 });

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
