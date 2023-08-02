import express from "express";

import adminCtrl from "../controllers/adminCtrl.js";
import auth from "../middleware/auth.js"

const router = express.Router();

router.get("/logoutAdmin", auth, adminCtrl.logout);
router.get("/refresh_token/admin", adminCtrl.refreshToken);

router.post("/loginAdmin", adminCtrl.login);

export default router;
