import Policies from "../models/policyModel.js";

const policyCtrl = {
  getAllPolices: async (req, res) => {
    try {
      const policies = await Policies.find({});
      if (!policies) return res.status(400).json({ msg: "Don't have any the policy" });

      return res.status(200).json({ policies });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getPolices: async (req, res) => {
    try {
      const policies = await Policies.find({ status: "normal" });
      if (!policies) return res.status(400).json({ msg: "Don't have any the policy" });

      return res.status(200).json({ policies });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createPolicy: async (req, res) => {
    try {
      const { content } = req.body;
      const newPolicy = new Policies({ content });
      await newPolicy.save();

      return res.status(200).json({ msg: "New policy create successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  editPolicy: async (req, res) => {
    try {
      const { idPolicy, content } = req.body;
      await Policies.findByIdAndUpdate({ _id: idPolicy }, { content });

      return res.status(200).json({ msg: "Update policy successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  changeStatusPolicy: async (req, res) => {
    try {
      const { idPolicy, status } = req.body;
      await Policies.findByIdAndUpdate({ _id: idPolicy }, { status });

      return res.status(200).json({ msg: "Change status policy successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  removePolicy: async (req, res) => {
    try {
      const { idPolicy } = req.body;
      await Policies.findByIdAndRemove({ _id: idPolicy });

      return res.status(200).json({ msg: "Remove policy successfully. You can check it in bin" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deletePolicy: async (req, res) => {
    try {
      const { idPolicy } = req.body;
      await Policies.findByIdAndDelete({ _id: idPolicy });

      return res.status(200).json({ msg: "Delete policy successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default policyCtrl;
