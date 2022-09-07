const express = require('express');
const router = express.Router();
let authorController=require("../controllers/authorController")
let blogController=require("../controllers/blogController")

router.post("/authors",authorController.createAuthor)
router.post("/blogs",blogController.createBlog)
router.get("/blogs",blogController.getBlogs)
router.put("/blogs/:blogId",blogController.updateBlogs)
router.delete("/blogs/:blogId",blogController.delBlogByParams)
router.delete("/blogs",blogController.delBlogByQuery)


module.exports = router;