import express from "express"

import categoryCtrl from "../controllers/categoryCtrl.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/get-all-categories", auth, categoryCtrl.getAllCategories)
router.get("/get-category/:id", auth, categoryCtrl.getCategory)

router.post("/create-category", auth, categoryCtrl.createCategory)

router.patch("/update-category/:id", auth, categoryCtrl.updateCategory)

router.delete("/delete-category/:id", auth, categoryCtrl.deleteCategory)

export default router