import express from "express";
import authCtrl from "../controllers/authCtrl.js";
import user from "../middleware/user.js";

const router = express.Router();
// none auth
router.get("/refresh-token", authCtrl.refreshToken);
router.get("/active/:token", authCtrl.activeAccount);

router.post("/login", authCtrl.login);
router.post("/register", authCtrl.register);
router.post("/forgot-password", authCtrl.forgotPassword);

// user
router.get("/logout", user, authCtrl.logout);

export default router;
