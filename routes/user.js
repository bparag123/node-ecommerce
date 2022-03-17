const express = require("express");
const { addUser, login, deleteUser } = require("../controllers/user.js")
const fileHandler = require("../filehandle.js")
const upload = require("../middlewares/uploadFile.js")
const mustLoggedIn = require("../middlewares/auth.js")
const router = express.Router()

//here upload is the middleware to upload image to google drive
router.post("/signup", fileHandler.single("avatar"), upload, addUser)
router.post("/login", login)
router.delete("/delete", mustLoggedIn, deleteUser)

module.exports = router