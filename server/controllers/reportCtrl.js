import Reports from "../models/reportModel.js";
import Users from "../models/userModel.js";
import Admins from "../models/adminModel.js";
import Blogs from "../models/blogModel.js";
import Comments from "../models/commentModel.js";
import Rooms from "../models/roomModel.js";
import Categories from "../models/categoryModel.js";
import Likes from "../models/likeModel.js";
import Views from "../models/viewModel.js";

const reportCtrl = {
  // auth
  deleteReport: async (req, res) => {
    try {
      const { idReport } = req.params;
      const idUser = req.user.id;
      const admin = await Admins.findOne({ _id: idUser }).projection({ password: 0 });
      const report = await Reports.findOne({ _id: idReport });
      if (!report) return res.json({ msg: "Report not found" });

      if (idUser !== report.idUser || !admin)
        return res.json({ msg: "You do not have permission to delete this report" });
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
      let data = {};
      const report = new Reports({ idUser, ids, type, content });

      switch (type) {
        case "user":
          data = await Users.findOneAndUpdate({ _id: ids }, { $push: { report: report._id } });
          report.reportedIdUser = data._id;
          break;
        case "blog":
          data = await Blogs.findOneAndUpdate({ _id: ids }, { $push: { report: report._id } });
          report.reportedIdUser = data.idUser;
          break;
        case "comment":
          data = await Comments.findOneAndUpdate({ _id: ids }, { $push: { report: report._id } });
          report.reportedIdUser = data.idUser;
          break;
        case "room":
          data = await Rooms.findOneAndUpdate({ _id: ids }, { $push: { report: report._id } });
          report.reportedIdUser = data.idUser;
          break;
      }

      await report.save();

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
      if (!report) return res.json({ msg: "Report not found" });
      if (idUser !== report.idUser) return res.json({ msg: "You are not owner" });

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
      let report = await Reports.findById(idReport).select("-__v");
      report = report._doc;
      if (!report) return res.json({ err: "Report not found" });

      const author = await Users.findById(report.idUser).select(
        "-__v -password -createdAt -updatedAt -status -friends -report"
      );
      if (!author) return res.json({ err: "User not found" });

      const user = await Users.findById(report.reportedIdUser).select(
        "-__v -password -createdAt -updatedAt -status -friends -report"
      );

      switch (report.type) {
        case "blog":
          report.blog = await Blogs.findById(report.ids);
          if (!report.blog) return res.json({ err: "Blog not found" });
          const category = await Categories.findById(report.blog.category);

          const likes = await Likes.count({
            idBlog: report.blog._id,
            like: true,
          });
          const dislikes = await Likes.count({
            idBlog: report.blog._id,
            like: false,
          });
          const comments = await Comments.count({
            idBlog: report.blog._id,
          });
          const views = await Views.findOne({ idBlog: report.blog._id });
          report.blog = {
            ...report.blog._doc,
            category: category.name,
            likes,
            dislikes,
            views: views.view,
            comments,
          };

          break;
        case "comment":
          report.comment = await Comments.findById(report.ids);
          if (!report.comment) return res.json({ err: "Comment not found" });
          break;
      }

      return res.status(200).json({ ...report, author, user });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },

  getReports: async (req, res) => {
    try {
      let reports = await Reports.find().select("-__v");

      reports = await Promise.all(
        reports.map(async (report) => {
          const author = await Users.findById(report.idUser).select(
            "-__v -password -createdAt -updatedAt -status -friends -report"
          );
          if (!author) return res.json({ err: "User not found" });

          return { ...report._doc, author: author.username };
        })
      );
      if (!reports) return res.json({ err: "User not found" });

      return res.status(200).json(reports);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  acceptReport: async (req, res) => {
    try {
      const { idReport } = req.params;
      const report = await Reports.findOne({ _id: idReport });
      if (!report) return res.json({ msg: "Report not found" });

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

      await Users.findOneAndUpdate(
        { _id: report.reportedIdUser },
        { $inc: { report: 1 } }
      );
      

      await Reports.findOneAndDelete({ _id: idReport });

      return res.status(200).json({ msg: "Accept report success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  declineReport: async (req, res) => {
    try {
      const { idReport } = req.params;

      const report = await Reports.findOne({ _id: idReport });
      if (!report) return res.json({ msg: "Report not found" });

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

      const res = await Reports.findOneAndDelete({ _id: idReport });
      if (!res) return res.json({ msg: "Report not found" });

      return res.status(200).json({ msg: "Accept report success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default reportCtrl;
