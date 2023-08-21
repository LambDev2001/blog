import Reports from "../models/reportModel.js";
import Users from "../models/userModel.js";
import Admins from "../models/adminModel.js";
import Blogs from "../models/blogModel.js";
import Comments from "../models/commentModel.js";
import Rooms from "../models/roomModel.js";

const reportCtrl = {
  // auth
  deleteReport: async (req, res) => {
    try {
      const { idReport } = req.params;
      const idUser = req.user.id;
      const admin = await Admins.findOne({ _id: idUser }).projection({ password: 0 });
      const report = await Reports.findOne({ _id: idReport });
      if (!report) return res.status(400).json({ msg: "Report not found" });

      if (idUser !== report.idUser || !admin)
        return res.status(400).json({ msg: "You do not have permission to delete this report" });
      await Reports.findOneAndDelete({ _id: id });

      return res.status(200).json({ msg: "Delete report success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // user
  createReport: async (req, res) => {
    try {
      const idUser = req.user.id;

      const { ids, type, content } = req.body;
      const report = new Reports({ idUser, ids, type, content });
      await report.save();

      switch (type) {
        case "user":
          await Users.findOneAndUpdate({ _id: ids }, { $push: { report: report._id } });
          break;
        case "blog":
          await Blogs.findOneAndUpdate({ _id: ids }, { $push: { report: report._id } });
          break;
        case "comment":
          await Comments.findOneAndUpdate({ _id: ids }, { $push: { report: report._id } });
          break;
        case "room":
          await Rooms.findOneAndUpdate({ _id: ids }, { $push: { report: report._id } });
          break;
      }
      return res.status(200).json({ msg: "Report success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  editReport: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { idReport } = req.params;
      const { content } = req.body;

      const report = await Reports.findOne({ _id: idReport });
      if (!report) return res.status(400).json({ msg: "Report not found" });
      if (idUser !== report.idUser) return res.status(400).json({ msg: "You are not owner" });

      await Reports.findOneAndUpdate({ _id: id }, { content }, { new: true });

      return res.status(200).json({ msg: "Edit report success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // permit
  getReport: async (req, res) => {
    try {
      const { idReport } = req.params;

      const reports = await Reports.findById(idReport).select("-__v");

      return res.status(200).json(reports);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getReports: async (req, res) => {
    try {
      const reports = await Reports.find().select("idUser ids type content updatedAt");

      return res.status(200).json(reports);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  acceptReport: async (req, res) => {
    try {
      const { idReport } = req.params;
      const report = await Reports.findOne({ _id: idReport });
      if (!report) return res.status(400).json({ msg: "Report not found" });

      switch (report.type) {
        case "user":
          await Users.findOneAndUpdate({ _id: report.ids }, { $pull: { report: report._id } });
          break;
        case "blog":
          await Blogs.findOneAndUpdate({ _id: report.ids }, { $pull: { report: report._id } });
          break;
        case "comment":
          break;
        case "group":
          break;
      }

      await Reports.findOneAndDelete({ _id: idReport });

      return res.status(200).json({ msg: "Accept report success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default reportCtrl;
