const express = require("express");
const { addToCart, myCart , removeFromCart, clearCart} = require("../controllers/cart.js")
const router = express.Router()
const mustLoggedIn = require("../middlewares/auth.js")

router.post("/add", mustLoggedIn,addToCart)
router.patch("/remove", mustLoggedIn,removeFromCart)
router.get("/mycart", mustLoggedIn, myCart)
router.delete("/clear", mustLoggedIn, clearCart)

module.exports = router