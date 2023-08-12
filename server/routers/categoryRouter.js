import express from "express"

import categoryCtrl from "../controllers/categoryCtrl.js"
import auth from "../middleware/auth.js"
import admin from "../middleware/admin.js"

const router = express.Router()
// auth
router.get("/get-all-categories", auth, categoryCtrl.getAllCategories)

// admin
router.get("/get-category/:idCategory", admin, categoryCtrl.getCategory)

router.post("/create-category", admin, categoryCtrl.createCategory)

router.patch("/update-category/:idCategory", admin, categoryCtrl.updateCategory)

router.delete("/delete-category/:idCategory", admin, categoryCtrl.deleteCategory)

export default router