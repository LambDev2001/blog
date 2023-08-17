import express from "express";

import friendRequestCtl from "../controllers/friendRequestCtrl.js";
import user from "../middleware/user.js";

const router = express.Router();
// user
router.get("/sending-friends", user, friendRequestCtl.listSendingRequest);
router.get("/waiting-friends", user, friendRequestCtl.listWaitingRequest);

router.post("/sending-friend", user, friendRequestCtl.sendRequest);
router.post("/accept-friend/:idRequest", user, friendRequestCtl.acceptRequest);

router.delete("/decline-friend/:idRequest", user, friendRequestCtl.declineRequest);

export default router;
