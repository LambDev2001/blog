import express from "express";

import categoryCtrl from "../controllers/categoryCtrl.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router();
// none
router.get("/search-category", categoryCtrl.searchCategory);

// auth
router.get("/categories", auth, categoryCtrl.getAllCategories);

// admin
router.get("/category/:idCategory", admin, categoryCtrl.getCategory);
router.get("/count-category", admin, categoryCtrl.countCategory);

router.post("/category", admin, categoryCtrl.createCategory);

router.patch("/category/:idCategory", admin, categoryCtrl.updateCategory);

router.delete("/category/:idCategory", admin, categoryCtrl.deleteCategory);

export default router;
