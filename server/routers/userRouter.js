import express from "express";

import userCtrl from "../controllers/userCtrl.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import user from "../middleware/user.js";

const router = express.Router();
// none auth
router.post("/reset-password", userCtrl.resetPassword);

// auth
router.get("/info-user/:idUser", auth, userCtrl.checkInfoUser);
router.get("/search-user", auth, userCtrl.searchUser);

// user
router.get("/friends", user, userCtrl.listFriends);
router.get("/following", user, userCtrl.listFollowing);

router.post("/change-password", user, userCtrl.changePassword);
router.post("/remove-friend/:idUser", user, userCtrl.removeFriend);

router.patch("/user/:idUser", user, userCtrl.updateUser);
router.patch("/follow", user, userCtrl.follow);
router.patch("/un-follow", user, userCtrl.unFollow);

// admin
router.get("/user/:idUser", admin, userCtrl.getUser);
router.get("/users", admin, userCtrl.getUsers);
router.patch("/change-status/:idUser", admin, userCtrl.changeStatus);
export default router;
