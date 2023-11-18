import Comments from "../models/commentModel.js";
import Users from "../models/userModel.js";
import { io } from "../server.js";

const commentCtrl = {
  // none auth
  getComments: async (req, res) => {
    try {
      const { idBlog } = req.params;
      let comments = await Comments.find({ idBlog, status: "normal", replyCM: "" })
        .select("idUser message createdAt updatedAt")
        .sort({ createdAt: -1 });

      comments = await Promise.all(
        comments.map(async (comment) => {
          const author = await Users.findById(comment.idUser).select(
            "-password -__v -report -status"
          );
          const countReply = await Comments.count({ replyCM: comment._id });
          const replies = [];
          return { ...comment._doc, author, replies, countReply };
        })
      );

      return res.status(200).json(comments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getReplies: async (req, res) => {
    try {
      const { idComment } = req.params;
      let comments = await Comments.find({ replyCM: idComment, status: "normal" })
        .select("idUser message createdAt updatedAt")
        .sort({ createdAt: -1 });

      comments = await Promise.all(
        comments.map(async (comment) => {
          const author = await Users.findById(comment.idUser).select(
            "-password -__v -report -status"
          );
          const countReply = await Comments.count({ replyCM: comment._id });
          const replies = [];
          return { ...comment._doc, author, replies, countReply };
        })
      );

      return res.status(200).json(comments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // user
  createComment: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { idBlog, message, replyCM } = req.body;
      let newComment = "";
      if (!replyCM) newComment = new Comments({ idUser, idBlog, message });
      else newComment = new Comments({ idUser, idBlog, message, replyCM });
      await newComment.save();

      const author = await Users.findById(newComment.idUser).select(
        "-__v -password -createdAt -updatedAt -status -friends -report"
      );

      const comment = {
        _id: newComment._id,
        idUser: newComment.idUser,
        replyCM: newComment.replyCM,
        message: newComment.message,
        createdAt: newComment.createdAt,
        updatedAt: newComment.updatedAt,
        author,
      };

      if (!replyCM) io.to(idBlog).emit("create-comment", comment);
      else io.to(idBlog).emit("reply-comment", replyCM);
      return res.status(200).json(comment);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  replyComment: async (req, res) => {
    try {
      const { idComment } = req.params;
      const { message } = req.body;

      const comment = await Comments.findOne({ _id: idComment });
      if (!comment) return res.json({ msg: "Comment not found" });

      const newReply = new Comments({ idUser: req.user.id, idBlog: comment.idBlog, message });
      await newReply.save();

      await Comments.findOneAndUpdate({ _id: idComment }, { $push: { replyCM: newReply._id } });
      const author = await Users.findById(comment.idUser).select("-password -__v -report -status");
      const countReply = await Comments.count({ replyCM: comment._id });
      const replies = [];

      const data = {
        idComment,
        data: {
          ...newReply._doc,
          author,
          replies,
          countReply,
        },
      };

      io.to(comment.idBlog).emit("reply-comment", data);
      return res.status(200).json({ msg: "Reply successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateComment: async (req, res) => {
    try {
      const { idComment } = req.params;
      const { message } = req.body;
      const comment = await Comments.findOne({ _id: idComment });

      if (!comment) return res.json({ msg: "Comment not found" });
      if (comment.idUser !== req.user.id) return res.json({ msg: "You are not owner" });

      await Comments.findOneAndUpdate({ _id: idComment }, { message });

      io.to(`${comment.idBlog}`).emit("update-comment", comment);
      return res.status(200).json({ msg: "Update successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const { idComment } = req.params;
      const comment = await Comments.findOne({ _id: idComment });

      if (!comment) return res.json({ msg: "Comment not found" });
      if (comment.idUser !== req.user.id) return res.json({ msg: "You are not owner" });

      await Comments.delete({ _id: idComment });

      io.to(comment.idBlog).emit("delete-comment", idComment);
      return res.status(200).json({ msg: "Delete comment successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default commentCtrl;
