import express from "express";

import adminCtrl from "../controllers/adminCtrl.js";
import admin from "../middleware/admin.js";

const router = express.Router();
// none auth
router.get("/refresh_token/admin", adminCtrl.refreshToken);

router.post("/loginAdmin", adminCtrl.login);

// admin
router.get("/logoutAdmin", admin, adminCtrl.logout);

export default router;
