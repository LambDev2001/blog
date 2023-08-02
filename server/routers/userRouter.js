import express from "express";

import userCtrl from "../controllers/userCtrl.js";
import auth from "../middleware/auth.js"

const router = express.Router();

router.get("/getUser", auth, userCtrl.getUser);
router.get("/checkInfoUser/:userId", userCtrl.checkInfoUser);
router.get("/getListUsers", userCtrl.getUsers);
router.get("/getListAdmins", auth, userCtrl.getAdmins);
router.get("/resetPassword/:token", userCtrl.resetPassword);
router.get("/listFriends/:idUser", userCtrl.listFriends);

router.post("/sendRequestFriend", auth, userCtrl.sendRequestFriend)
router.post("/declineFriend", auth, userCtrl.declineFriend)
router.post("/acceptFriend",auth, userCtrl.acceptFriend)
router.post("/removeFriend",auth, userCtrl.removeFriend)

router.patch("/updateUser/:userId", auth, userCtrl.updateUser);
router.patch("/manageRole", auth, userCtrl.manageRole);

router.delete("/deleteUser/:userId", auth, userCtrl.deleteUser);

export default router;
