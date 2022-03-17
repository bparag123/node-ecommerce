const express = require("express");
const {
    getAllProducts, getProductById, addProduct,getProductsByCategory,
    productsOfCategory, sortProducts, searchProducts, removeProduct,
     addReview, getRatedProducts
} = require("../controllers/product.js")


const mustLoggedIn = require("../middlewares/auth.js")
const upload = require("../middlewares/uploadFile.js")
const displayPaginated = require("../middlewares/displayPaginated.js")
const fileHandler = require("../filehandle.js")
const router = express.Router()

//here apply pagination is middleware to inject the pagination in the applied data
router.get("", getAllProducts, displayPaginated)
router.get("/rated", getRatedProducts, displayPaginated)
router.get("/sort", sortProducts)
router.get("/search", searchProducts)
router.get("/category-wise", getProductsByCategory)
router.get("/category/:name", productsOfCategory)
router.get("/:id", getProductById)


//here upload is the middleware to upload the image to the google drive
router.post("/add", mustLoggedIn, fileHandler.single("image"), upload, addProduct)
router.patch("/remove", removeProduct)
router.post("/review/add", mustLoggedIn, addReview)

module.exports = router