const express = require("express")
const {addCategory, addSubCategory, getCategories} = require("../controllers/categories.js")
const router = express.Router()

router.post("/add", addCategory)
router.post("/sub-category/add", addSubCategory)

router.get("", getCategories)

module.exports = router