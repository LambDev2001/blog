import express from "express";

import commentCtrl from "../controllers/commentCtrl.js";
import user from "../middleware/user.js"

const router = express.Router()

// none auth
router.get("/comments/:idBlog", commentCtrl.getComments)
router.get("/reply-comments/:idComment", commentCtrl.showReplyComments)

// user

router.post("/comment",user, commentCtrl.createComment)
router.post("/reply-comment/:idComment",user, commentCtrl.replyComment)

router.patch("/comment/:idComment", user, commentCtrl.updateComment)

router.delete("/comment/:idComment", user, commentCtrl.deleteComment)

export default router