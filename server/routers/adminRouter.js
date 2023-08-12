import express from "express";

import adminCtrl from "../controllers/adminCtrl.js";
import admin from "../middleware/admin.js";

const router = express.Router();
// none auth
router.get("/refresh-token/admin", adminCtrl.refreshToken);

router.post("/login-admin", adminCtrl.login);

// admin
router.get("/logout-admin", admin, adminCtrl.logout);

export default router;
