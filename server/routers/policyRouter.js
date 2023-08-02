import express from "express";
import policyCtrl from "../controllers/policyCtrl.js";
import auth from "../middleware/auth.js"

const router = express.Router();

router.get("/get-all-policies",auth, policyCtrl.getAllPolices)
router.get("/get-policies",auth, policyCtrl.getPolices)

router.post("/create-policy",auth, policyCtrl.createPolicy)

router.put("/edit-policy",auth, policyCtrl.editPolicy)
router.put("/change-status-policy",auth, policyCtrl.changeStatusPolicy)

router.delete("/remove-policy",auth, policyCtrl.removePolicy)
router.delete("/delete-policy",auth, policyCtrl.deletePolicy)

export default router;
