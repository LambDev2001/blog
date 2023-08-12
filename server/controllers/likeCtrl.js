import Likes from "../models/likeModel.js";
import Blogs from "../models/blogModel.js";

const likeCtrl = {
  // user
  like: async (req, res) => {
    try {
      const idBlog = req.params.idBlog;

      const blog = await Blogs.findById(idBlog);
      if (!blog) return res.status(400).json({ msg: "Blog not found" });

      const like = await Likes.findOne({
        idBlog,
        idUser: req.user.id,
        like: true,
      });
      if (like) return res.status(400).json({ msg: "Wait a second" });

      await Likes.findOneAndUpdate(
        { idBlog, idUser: req.user.id },
        { like: true },
        { upsert: true, new: true }
      );

      return res.status(200).json({ msg: "Like is success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  dislike: async (req, res) => {
    try {
      const idBlog = req.params.idBlog;

      const blog = await Blogs.findById(idBlog);
      if (!blog) return res.status(400).json({ msg: "Blog not found" });

      const like = await Likes.findOne({
        idBlog,
        idUser: req.user.id,
        like: false,
      });
      if (like) return res.status(400).json({ msg: "Wait a second" });

      await Likes.findOneAndUpdate(
        { idBlog, idUser: req.user.id },
        { like: false },
        { upsert: true, new: true }
      );

      return res.status(200).json({ msg: "Dislike is success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default likeCtrl;
