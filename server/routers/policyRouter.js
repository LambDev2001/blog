import express from "express";
import policyCtrl from "../controllers/policyCtrl.js";
import auth from "../middleware/auth.js"
import admin from "../middleware/admin.js";

const router = express.Router();
// auth
router.get("/get-policies",auth, policyCtrl.getPolices) // user can see and accept

// admin
router.get("/get-all-policies",admin, policyCtrl.getAllPolices) // for admin manager polices

router.post("/create-policy",admin, policyCtrl.createPolicy)

router.put("/edit-policy",admin, policyCtrl.editPolicy)
router.put("/change-status-policy",admin, policyCtrl.changeStatusPolicy)

router.delete("/remove-policy",admin, policyCtrl.removePolicy)
router.delete("/delete-policy",admin, policyCtrl.deletePolicy)

export default router;
