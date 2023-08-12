import express from "express";

import likeCtrl from "../controllers/likeCtrl.js";
import user from "../middleware/user.js";

const router = express.Router();
// user
router.post("/like/:idBlog", user, likeCtrl.like);
router.post("/dislike/:idBlog", user, likeCtrl.dislike);

export default router;
