import express from "express";

import friendRequestCtl from "../controllers/friendRequestCtrl.js";
import user from "../middleware/user.js";

const router = express.Router();
// user
router.get("/list-sending-request-friend", user, friendRequestCtl.listSendingRequest);
router.get("/list-waiting-request-friend", user, friendRequestCtl.listWaitingRequest);

router.post("/send-request-friend", user, friendRequestCtl.sendRequest);
router.post("/accept-friend/:id", user, friendRequestCtl.acceptRequest);

router.delete("/decline-friend/:id", user, friendRequestCtl.declineRequest);

export default router;
