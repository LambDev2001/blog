import express from "express";
import authCtrl from "../controllers/authCtrl.js";
import user from "../middleware/user.js";

const router = express.Router();

router.get("/logout", user, authCtrl.logout);
router.get("/refresh_token", authCtrl.refreshToken);
router.get("/active/:token", authCtrl.activeAccount);

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.post("/forgotPassword", authCtrl.forgotPassword);

export default router;
