import Comments from "../models/commentModel.js";
import Users from "../models/userModel.js";
import { io } from "../server.js";

const commentCtrl = {
  // none auth
  getComments: async (req, res) => {
    try {
      const { idBlog } = req.params;
      let comments = await Comments.find({ idBlog, status: "normal" })
        .select("idUser message replyCM createdAt updatedAt")
        .sort({ createdAt: -1 });
      if (comments.length === 0) return res.status(200).json({ msg: "This blog has no comment" });

      comments = await Promise.all(
        comments.map(async (comment) => {
          const author = await Users.findById(comment.idUser).select(
            "-password -__v -report -status"
          );
          return { ...comment._doc, author };
        })
      );
      

      return res.status(200).json(comments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  showReplyComments: async (req, res) => {
    try {
      const { idComment } = req.params;
      const comment = await Comments.findById(idComment);
      if (!comment) return res.json({ msg: "Comment not found" });
      if (comment.replyCM.length === 0)
        return res.status(200).json({ msg: "This comment has no reply" });

      const listReplyComment = await Promise.all(
        comment.replyCM.map(async (idReplyComment) => {
          const replyComment = await Comments.findById(idReplyComment).select(
            "idUser message replyCM updatedAt"
          );
          return {
            _id: replyComment._id,
            idUser: replyComment.idUser,
            message: replyComment.message,
            countReplyComment: replyComment.replyCM.length,
            updatedAt: replyComment.updatedAt,
          };
        })
      );

      return res.status(200).json(listReplyComment);
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

      const author = await Users.findById(newComment.idUser).select(
        "-__v -password -createdAt -updatedAt -status -friends -report"
      )

      const comment = {
        _id: newComment._id,
        idUser: newComment.idUser,
        replyCM: newComment.replyCM,
        message: newComment.message,
        createdAt : newComment.createdAt,
        updatedAt: newComment.updatedAt,
        author
      }

      io.to(`${idBlog}`).emit("create-comment", comment);
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

      await Comments.findOneAndDelete({ _id: idComment });

      io.to(`${comment.idBlog}`).emit("delete-comment", comment);
      return res.status(200).json({ msg: "Delete successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default commentCtrl;
