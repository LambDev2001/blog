import Views from "../models/viewModel.js";
import Blogs from "../models/blogModel.js";
import Categories from "../models/categoryModel.js";

const viewCtrl = {
  // auth
  mostView: async (req, res) => {
    try {
      const listIdBlogs = await Views.find().sort({ view: -1 }).select("idBlog view").limit(5);
      const listBlogs = await Promise.all(
        listIdBlogs.map(async (idBlog) => {
          const blog = await Blogs.findById(idBlog.idBlog);
          const category = await Categories.findById(blog.category);
          const { _id, idUser, title, thumbnail, description } = blog._doc;
          return {
            _id,
            idUser,
            title,
            thumbnail,
            description,
            category: category.name,
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
      const listIdBlogs = await Views.find()
        .sort({ viewMonthly: -1 })
        .select("idBlog viewMonthly")
        .limit(5);
      const listBlogs = await Promise.all(
        listIdBlogs.map(async (idBlog) => {
          const blog = await Blogs.findById(idBlog.idBlog);
          const category = await Categories.findById(blog.category);
          const { _id, idUser, title, thumbnail, description } = blog._doc;
          return {
            _id,
            idUser,
            title,
            thumbnail,
            description,
            category: category.name,
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
