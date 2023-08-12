import express from "express";

import reportCtrl from "../controllers/reportCtrl.js";
import user from "../middleware/user.js";
import permit from "../middleware/permit.js";
import auth from "../middleware/auth.js";

const router = express.Router();
// auth
router.delete("/delete-report/:idReport", auth, reportCtrl.deleteReport);

// user
router.post("/create-report", user, reportCtrl.createReport);

router.patch("/edit-report/:idReport", user, reportCtrl.editReport);

// permit
router.get("/get-report/:ids", permit, reportCtrl.getReport);
router.get("/get-reports", permit, reportCtrl.getReports);

router.post("/accept-report/:idReport", permit, reportCtrl.acceptReport);

export default router;
