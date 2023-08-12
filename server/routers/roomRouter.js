import express from "express";

import roomCtrl from "../controllers/roomCtrl.js";
import user from "../middleware/user.js";

const router = express.Router();

// user
router.get("/list-room", user, roomCtrl.listRoom);
router.get("/list-member-room/:idRoom", user, roomCtrl.listMember);

router.post("/create-room", user, roomCtrl.createRoom);
router.post("/add-member/:idRoom", user, roomCtrl.addMember);
router.post("/remove-member-room/:idRoom", user, roomCtrl.removeMember);

router.delete("/delete-room/:idRoom", user, roomCtrl.deleteRoom);

export default router;
