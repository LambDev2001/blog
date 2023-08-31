import express from "express";
import policyCtrl from "../controllers/policyCtrl.js";
import auth from "../middleware/auth.js"
import admin from "../middleware/admin.js";

const router = express.Router();
// auth
router.get("/policies",auth, policyCtrl.getPolices) // user can see and accept

// admin
router.get("/all-policies",admin, policyCtrl.getAllPolices) // for admin manager polices

router.post("/policy",admin, policyCtrl.createPolicy)

router.patch("/policy/:idPolicy",admin, policyCtrl.editPolicy)
router.patch("/status-policy/:idPolicy",admin, policyCtrl.changeStatusPolicy)

router.delete("/policy",admin, policyCtrl.deletePolicy)

export default router;
