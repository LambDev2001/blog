import Policies from "../models/policyModel.js";

const policyCtrl = {
  // auth
  getPolices: async (req, res) => {
    try {
      const policies = await Policies.find({ status: "normal" }).select("content updatedAt");
      if (!policies) return res.json({ msg: "Don't have any the policy" });

      return res.status(200).json(policies);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // admin
  getAllPolices: async (req, res) => {
    try {
      const policies = await Policies.find({}).select("content status updatedAt");
      if (!policies) return res.json({ msg: "Don't have any the policy" });

      return res.status(200).json(policies);
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
      const { idPolicy } = req.params;
      const policy = req.body;
      const newPolicy = await Policies.findByIdAndUpdate({ _id: idPolicy }, { ...policy }).select(
        "content status updatedAt"
      );
      if (!res) return res.json({ err: "Not found policy" });
      return res.status(200).json(newPolicy);
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
