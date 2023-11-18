import Categories from "../models/categoryModel.js";
import Admins from "../models/adminModel.js";
import Blogs from "../models/blogModel.js";

const categoryCtrl = {
  // none
  searchCategory: async (req, res) => {
    try {
      const categories = await Categories.aggregate([
        {
          $search: {
            index: "searchCategory",
            autocomplete: {
              query: `${req.query.search}`,
              path: "name",
            },
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 5 },
        {
          $project: {
            _id: 1,
            name: 1,
          },
        },
      ]);

      if (categories.length < 1) return res.json({ msg: "No Category." });

      return res.status(200).json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // auth
  getAllCategories: async (req, res) => {
    try {
      const listCategories = await Categories.find({}).select("name");
      return res.status(200).json(listCategories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // admin
  getCategory: async (req, res) => {
    try {
      const { idCategory } = req.params;
      const listCategories = await Categories.findById(idCategory).select("name");

      return res.status(200).json(listCategories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  countCategory: async (req, res) => {
    try {
      const categories = await Categories.find();
      let result = await Promise.all(
        categories.map(async (category) => {
          const countBlogs = await Blogs.count({ category: category._id });
          if (!!countBlogs && countBlogs > 0) {
            return { category: category.name, countBlogs };
          }
        })
      );

      result = result.filter((item) => item !== undefined);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      const idAdmin = req.user.id;
      const { name } = req.body;
      const admin = await Admins.findOne({ _id: req.user.id });
      const newCategory = new Categories({ name });

      await newCategory.save();

      return res.status(200).json(newCategory);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { idCategory } = req.params;
      const { name } = req.body;

      await Categories.findOneAndUpdate({ _id: idCategory }, { name });

      return res.status(200).json({ msg: "Update category successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { idCategory } = req.params;
      await Categories.delete({ _id: idCategory });

      return res.status(200).json({ msg: "Delete category successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default categoryCtrl;
