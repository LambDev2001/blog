import express from "express";

import userCtrl from "../controllers/userCtrl.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import user from "../middleware/user.js";

const router = express.Router();
// auth
router.get("/check-info-user/:id", auth, userCtrl.checkInfoUser);

// user
router.get("/reset-password/:token", userCtrl.resetPassword);
router.get("/list-friends", user, userCtrl.listFriends);

router.post("/remove-friend/:id", user, userCtrl.removeFriend);

router.patch("/update-user/:id", user, userCtrl.updateUser);

// admin
router.get("/get-user", admin, userCtrl.getUser);
router.get("/get-list-users", admin, userCtrl.getUsers);
export default router;
