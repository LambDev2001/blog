import express from "express"

import categoryCtrl from "../controllers/categoryCtrl.js"
import auth from "../middleware/auth.js"
import admin from "../middleware/admin.js"

const router = express.Router()

router.get("/get-all-categories", auth, categoryCtrl.getAllCategories)
router.get("/get-category/:id", admin, categoryCtrl.getCategory)

router.post("/create-category", admin, categoryCtrl.createCategory)

router.patch("/update-category/:id", admin, categoryCtrl.updateCategory)

router.delete("/delete-category/:id", admin, categoryCtrl.deleteCategory)

export default router