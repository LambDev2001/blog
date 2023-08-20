import Views from "../models/viewModel.js";
import Blogs from "../models/blogModel.js";
import Categories from "../models/categoryModel.js";
import Likes from "../models/likeModel.js";
import Comments from "../models/commentModel.js";

const viewCtrl = {
  // auth
  mostView: async (req, res) => {
    try {
      const listIdBlogs = await Views.find().sort({ view: -1 }).select("idBlog view").limit(5);
      const listBlogs = await Promise.all(
        listIdBlogs.map(async (idBlog) => {
          console.log(idBlog)
          const blog = await Blogs.findById(idBlog.idBlog);
          const category = await Categories.findById(blog.category);
          const { _id, idUser, title, thumbnail, description, share } = blog._doc;
          const countComment = await Comments.count({
            idBlog: idBlog.idBlog,
          });
          const countLikes = await Likes.count({
            idBlog: idBlog.idBlog,
            like: true,
          });

          const countDislikes = await Likes.count({
            idBlog: idBlog.idBlog,
            like: false,
          });
          return {
            _id,
            idUser,
            title,
            thumbnail,
            description,
            category: category.name,
            countLikes,
            countDislikes,
            countComment,
            share,
            view: idBlog.view,
          };
        })
      );

      return res.status(200).json(listBlogs);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  mostViewMonthly: async (req, res) => {
    try {
      const listIdBlogs = await Views.find().sort({ viewMonthly: -1 }).select("idBlog viewMonthly").limit(5);
      const listBlogs = await Promise.all(
        listIdBlogs.map(async (idBlog) => {
          const blog = await Blogs.findById(idBlog.idBlog);
          const category = await Categories.findById(blog.category);
          const { _id, idUser, title, thumbnail, description, share } = blog._doc;
          const countComment = await Comments.count({
            idBlog: _id,
          });
          const countLikes = await Likes.count({
            idBlog: _id,
            like: true,
          });

          const countDislikes = await Likes.count({
            idBlog: _id,
            like: false,
          });
          return {
            _id,
            idUser,
            title,
            thumbnail,
            description,
            category: category.name,
            countLikes,
            countDislikes,
            countComment,
            share,
            viewMonthly: idBlog.viewMonthly,
          };
        })
      );

      return res.status(200).json(listBlogs);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  increaseView: async (req, res) => {
    try {
      const idBlog = req.params.idBlog;
      const view = await Views.findOne({ idBlog });
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      if (
        currentYear !== view.updatedAt.getFullYear() ||
        currentMonth !== view.updatedAt.getMonth()
      ) {
        view.viewMonthly = 0;
      }

      view.viewMonthly++;
      view.view++;
      console.log(view);
      await view.save();

      return res.status(200).json({ msg: "increased view" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default viewCtrl;
