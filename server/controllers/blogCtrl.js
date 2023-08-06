import checkData from "../config/checkData.js";
import Blogs from "../models/blogModel.js";

const blogCtrl = {
  createBlog: async (req, res) => {
    try {
      const idUser = req.user.id;

      const valid = checkData(req.body, "title", "content", "thumbnail", "description", "category")
      
      if(valid !== true) return res.status(400).json({valid})
      const newBlog = new Blogs({idUser,...req.body })
      newBlog.save()

      return res.status(200).json({ msg: "Create blog successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default blogCtrl;
