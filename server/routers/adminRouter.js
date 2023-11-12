import express from "express";

import adminCtrl from "../controllers/adminCtrl.js";
import admin from "../middleware/admin.js";

const router = express.Router();
// none auth
router.get("/refresh-token/admin", adminCtrl.refreshToken);

router.post("/login-admin", adminCtrl.login);

// admin
router.get("/logout-admin", admin, adminCtrl.logout);
router.get("/dashboard", admin, adminCtrl.dashboard)
router.get("/permits", admin, adminCtrl.permits)
router.get("/active-permit/:token", adminCtrl.activePermit)
router.post("/permit", admin, adminCtrl.createPermit)
router.delete("/permit/:idPermit", admin, adminCtrl.deletePermit)

export default router;
