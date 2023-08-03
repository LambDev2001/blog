import Categories from "../models/categoryModel.js";
import Admins from "../models/adminModel.js";

const categoryCtrl = {
  createCategory: async (req, res) => {
    try {
      const idAdmin = req.user.id;
      const admin = await Admins.findOne({ _id: req.user.id });
      if (!idAdmin || !admin)
        return res.status(403).json({ msg: "Admin not found" });

      const { name } = req.body;

      const newCategory = new Categories({ name });
      newCategory.save();

      return res.status(200).json({ msg: "Create category successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const idAdmin = req.user.id;
      const admin = await Admins.findOne({ _id: req.user.id });
      if (!idAdmin || !admin)
        return res.status(403).json({ msg: "Admin not found" });

      const listCategories = await Categories.find({});

      return res.status(200).json({ listCategories });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getCategory: async (req, res) => {
    try {
      const idAdmin = req.user.id;
      const admin = await Admins.findOne({ _id: req.user.id });
      if (!idAdmin || !admin)
        return res.status(403).json({ msg: "Admin not found" });

      const listCategories = await Categories.findOne({ _id: req.params.id });

      return res.status(200).json({ listCategories });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const idAdmin = req.user.id;
      const admin = await Admins.findOne({ _id: req.user.id });
      if (!idAdmin || !admin)
        return res.status(403).json({ msg: "Admin not found" });

      const idCategory = req.params.id;
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
      const admin = await Admins.findOne({ _id: req.user.id });
      if (!idAdmin || !admin)
        return res.status(403).json({ msg: "Admin not found" });

      const idCategory = req.params.id;

      await Categories.findOneAndDelete({ _id: idCategory });

      return res.status(200).json({ msg: "Delete category successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default categoryCtrl;
