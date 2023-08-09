import express from "express";

import likeCtrl from "../controllers/likeCtrl.js";
import user from "../middleware/user.js";

const router = express.Router();

router.post("/like/:id", user, likeCtrl.like);
router.post("/dislike/:id", user, likeCtrl.dislike);

export default router;
