import express from "express";

import userCtrl from "../controllers/userCtrl.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import user from "../middleware/user.js";

const router = express.Router();
// auth
router.get("/info-user/:idUser", auth, userCtrl.checkInfoUser);
router.get("/search-user", auth, userCtrl.searchUser);

// user
router.post("/reset-password", userCtrl.resetPassword);
router.get("/friends", user, userCtrl.listFriends);

router.post("/remove-friend/:idUser", user, userCtrl.removeFriend);

router.patch("/user/:idUser", user, userCtrl.updateUser);

// admin
router.get("/user/:idUser", admin, userCtrl.getUser);
router.get("/users", admin, userCtrl.getUsers);
router.patch("/change-status/:idUser", admin, userCtrl.changeStatus);
export default router;
