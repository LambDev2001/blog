import express from "express";

import user from "../middleware/user.js";
import chatCtrl from "../controllers/chatCtrl.js";

const router = express.Router();

// user
router.get("/chats", user, chatCtrl.listChat);

router.post("/chat", user, chatCtrl.createChat);

router.delete("/chat/:idChat", user, chatCtrl.deleteChat);

export default router;
