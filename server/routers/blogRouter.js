import express from "express";

import blogCtrl from "../controllers/blogCtrl.js";
import user from "../middleware/user.js";
import permit from "../middleware/permit.js";
import auth from "../middleware/auth.js";

const router = express.Router();
// auth
router.post("/increase-view/:id", auth, blogCtrl.increaseView);
router.delete("/delete-blog/:id", auth, blogCtrl.deleteBlog);

// user
router.get("/list-blogs", user, blogCtrl.listBlogs);
router.get("/list-friends-blogs", user, blogCtrl.listFriendsBlogs);

router.post("/create-blog", user, blogCtrl.createBlog);

router.patch("/update-blog/:id", user, blogCtrl.updateBlog);

// permit
router.get("/list-blogs-admin", permit, blogCtrl.listBlogsAdmin);

router.patch("/status-blog/:id", permit, blogCtrl.statusBlog);

export default router;
