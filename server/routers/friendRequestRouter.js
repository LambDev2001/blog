import express from "express"

import friendRequestCtl from "../controllers/friendRequestCtrl.js";
import auth from "../middleware/auth.js"

const router = express.Router();

router.get("/list-sending-request-friend",auth, friendRequestCtl.listSendingRequest)
router.get("/list-waiting-request-friend",auth, friendRequestCtl.listWaitingRequest)

router.post("/send-request-friend",auth, friendRequestCtl.sendRequest)
router.post("/accept-friend/:id",auth, friendRequestCtl.acceptRequest)

router.delete("/decline-friend/:id",auth, friendRequestCtl.declineRequest)

export default router
