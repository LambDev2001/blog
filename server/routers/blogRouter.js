import express from "express";

import blogCtrl from "../controllers/blogCtrl.js";
import user from "../middleware/user.js";
import permit from "../middleware/permit.js";
import auth from "../middleware/auth.js";

const router = express.Router();
// none auth
router.get("/search-blog", blogCtrl.searchBlog);

router.patch("/increase-share/:idBlog", blogCtrl.increaseShare);

// auth
router.delete("/delete-blog/:idBlog", auth, blogCtrl.deleteBlog);

// user
router.get("/blogs", user, blogCtrl.listBlogs);
router.get("/blogs-friends", user, blogCtrl.listFriendsBlogs);

router.post("/blog", user, blogCtrl.createBlog);

router.patch("/blog/:idBlog", user, blogCtrl.updateBlog);

// permit
router.get("/blogs-admin", permit, blogCtrl.listBlogsAdmin);

router.patch("/status-blog/:idBlog", permit, blogCtrl.statusBlog);

export default router;
