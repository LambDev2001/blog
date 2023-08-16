import Blogs from "../models/blogModel.js";
import Comments from "../models/commentModel.js";
import { io } from "../server.js";

const commentCtrl = {
  // none auth
  getComments: async (req, res) => {
    try {
      const idBlog = req.params.idBlog;
      const comments = await Comments.find({ idBlog }).limit(10);
      if (comments.length === 0) return res.status(200).json({ msg: "This blog has no comment" });

      const listComment = await Promise.all(
        comments.map((comment) => {
          return { ...comment._doc, countReplyComment: comment.replyCM.length };
        })
      );

      return res.status(200).json(listComment);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  showReplyComments: async (req, res) => {
    try {
      const idComment = req.params.idComment;
      const comments = await Comments.find({ _id: idComment }).select(
        "_id idUser message replyCM createdAt"
      );

      if (!comments) return res.status(400).json({ msg: "Comment not found" });
      if (comments.length === 0) return res.status(200).json({ msg: "This comment has no reply" });

      const listComment = await Promise.all(
        comments.map((comment) => {
          return { ...comment._doc, countReplyComment: comment.replyCM.length };
        })
      );

      return res.status(200).json(listComment);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // user
  createComment: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { idBlog, message } = req.body;

      const newComment = new Comments({ idUser, idBlog, message });
      await newComment.save();

      const data = new Object({
        newComment: newComment._doc,
        user: req.user,
      });

      io.to(`${idBlog}`).emit("create-comment", data);
      return res.status(200).json(newComment);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  replyComment: async (req, res) => {
    try {
      const idComment = req.params.idComment;
      const { message } = req.body;

      const comment = await Comments.findOne({ _id: idComment });
      if (!comment) return res.status(400).json({ msg: "Comment not found" });

      const newReply = new Comments({ idUser: req.user.id, idBlog: comment.idBlog, message });
      await newReply.save();

      await Comments.findOneAndUpdate({ _id: idComment }, { $push: { replyCM: newReply._id } });

      const data = {
        blog: { ...newReply._doc },
        user: req.user,
      };

      io.to(`${comment.idBlog}`).emit("reply-comment", data);
      return res.status(200).json({ msg: "Reply successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateComment: async (req, res) => {
    try {
      const idComment = req.params.idComment;
      const { message } = req.body;
      const comment = await Comments.findOne({ _id: idComment });

      if (!comment) return res.status(400).json({ msg: "Comment not found" });
      if (comment.idUser !== req.user.id) return res.status(400).json({ msg: "You are not owner" });

      await Comments.findOneAndUpdate({ _id: idComment }, { message });

      io.to(`${comment.idBlog}`).emit("update-comment", comment);
      return res.status(200).json({ msg: "Update successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const idComment = req.params.idComment;
      const comment = await Comments.findOne({ _id: idComment });

      if (!comment) return res.status(400).json({ msg: "Comment not found" });
      if (comment.idUser !== req.user.id) return res.status(400).json({ msg: "You are not owner" });

      await Comments.findOneAndDelete({ _id: idComment });

      io.to(`${comment.idBlog}`).emit("delete-comment", comment);
      return res.status(200).json({ msg: "Delete successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default commentCtrl;
