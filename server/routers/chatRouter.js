import express from "express";

import user from "../middleware/user.js";
import chatCtrl from "../controllers/chatCtrl.js";

const router = express.Router();

// user
router.get("list-chat", user, chatCtrl.listChat);

router.post("create-chat", user, chatCtrl.createChat);

router.delete("delete-chat", user, chatCtrl.deleteChat);

export default router;
