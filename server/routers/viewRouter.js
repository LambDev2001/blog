import express from "express";

import viewCtrl from "../controllers/viewCtrl.js";
import auth from "../middleware/auth.js";

const router = express.Router();
// auth
router.get("/most-view", auth, viewCtrl.mostView);
router.get("/most-view-monthly", auth, viewCtrl.mostViewMonthly);

router.post("/increase-view/:id", auth, viewCtrl.increaseView);

export default router;
