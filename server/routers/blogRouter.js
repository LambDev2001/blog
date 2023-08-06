import express from "express"
import blogCtrl from "../controllers/blogCtrl.js"
import user from "../middleware/user.js"

const router = express.Router()

router.post("/create-blog", user, blogCtrl.createBlog)


export default router