import Categories from "../models/categoryModel.js";
import Admins from "../models/adminModel.js";

const categoryCtrl = {
  // auth
  getAllCategories: async (req, res) => {
    try {
      const idAdmin = req.user.id;
      const admin = await Admins.findOne({ _id: req.user.id });
      const listCategories = await Categories.find({});

      return res.status(200).json({ listCategories });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // admin
  getCategory: async (req, res) => {
    try {
      const idAdmin = req.user.idCategory;
      const admin = await Admins.findOne({ _id: req.user.id });
      const listCategories = await Categories.findOne({ _id: req.params.id });

      return res.status(200).json({ listCategories });
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

      return res.status(200).json({ msg: "Create category successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const idAdmin = req.user.id;
      const idCategory = req.params.idCategory;
      const admin = await Admins.findOne({ _id: req.user.id });
      const { name } = req.body;

      await Categories.findOneAndUpdate({ _id: idCategory }, { name });

      return res.status(200).json({ msg: "Update category successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const idAdmin = req.user.id;
      const idCategory = req.params.idCategory;
      const admin = await Admins.findOne({ _id: req.user.id });

      await Categories.findOneAndDelete({ _id: idCategory });

      return res.status(200).json({ msg: "Delete category successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default categoryCtrl;
