import express from "express";

import roomCtrl from "../controllers/roomCtrl.js";
import user from "../middleware/user.js";

const router = express.Router();

// user
router.get("/rooms", user, roomCtrl.listRoom);
router.get("/room-member/:idRoom", user, roomCtrl.listMember);

router.post("/room", user, roomCtrl.createRoom);
router.post("/add-member/:idRoom", user, roomCtrl.addMember);
router.post("/remove-member/:idRoom", user, roomCtrl.removeMember);

router.delete("/room/:idRoom", user, roomCtrl.deleteRoom);

export default router;
