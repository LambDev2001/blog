import express from "express";

import roomCtrl from "../controllers/roomCtrl.js";
import user from "../middleware/user.js";

const router = express.Router();

// user
router.get("/list-room", user, roomCtrl.listRoom);

router.post("/create-room", user, roomCtrl.createRoom);
router.post("/remove-member-room/:idRoom", user, roomCtrl.removeMember);

router.patch("/add-member/:idRoom", user, roomCtrl.addMember);

export default router;
