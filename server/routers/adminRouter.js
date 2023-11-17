import express from "express";

import adminCtrl from "../controllers/adminCtrl.js";
import admin from "../middleware/admin.js";
import permit from "../middleware/permit.js";

const router = express.Router();
// none auth
router.get("/refresh-token/admin", adminCtrl.refreshToken);

router.post("/login-admin", adminCtrl.login);

// admin
router.get("/logout-admin", admin, adminCtrl.logout);
router.get("/dashboard", admin, adminCtrl.dashboard)
router.get("/permits", admin, adminCtrl.permits)
router.get("/active-permit/:token", adminCtrl.activePermit)
router.post(`/send-mail/:to`, admin, adminCtrl.customSendMail)
router.post("/permit", admin, adminCtrl.createPermit)
router.patch("/update-admin/:idAdmin", permit, adminCtrl.updateAdmin)
router.delete("/permit/:idPermit", admin, adminCtrl.deletePermit)

export default router;
