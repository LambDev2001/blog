import express from "express";

import roomCtrl from "../controllers/roomCtrl.js";
import user from "../middleware/user.js";

const router = express.Router();

// user
router.get("/rooms", user, roomCtrl.listRoom);
router.get("/room-members/:idRoom", user, roomCtrl.listMember);
router.get("/info-room/:idRoom", user, roomCtrl.infoRoom)

router.post("/room", user, roomCtrl.createRoom);
router.post("/add-member/:idRoom", user, roomCtrl.addMember);
router.post("/kick-member/:idRoom", user, roomCtrl.removeMember);
router.post("/leave-room/:idRoom", user, roomCtrl.leaveMember);

router.patch("/room/:idRoom", user, roomCtrl.updateRoom);

router.delete("/room/:idRoom", user, roomCtrl.deleteRoom);

export default router;
