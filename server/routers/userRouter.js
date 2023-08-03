import express from "express";

import userCtrl from "../controllers/userCtrl.js";
import auth from "../middleware/auth.js"

const router = express.Router();

router.get("/get-user", auth, userCtrl.getUser);
router.get("/get-list-users", userCtrl.getUsers);
router.get("/check-info-user/:id", userCtrl.checkInfoUser);
router.get("/reset-password/:token", userCtrl.resetPassword);
router.get("/list-friends",auth,  userCtrl.listFriends);

router.post("/remove-friend/:id",auth, userCtrl.removeFriend)

router.patch("/update-user/:id", auth, userCtrl.updateUser);

export default router;
