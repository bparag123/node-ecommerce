const Users = require("../models/user.js")
const jwt = require("jsonwebtoken")
const Carts = require("../models/cart.js")
const config = require("../config")

const addUser = async (req, res, next) => {
    const data = req.body
    const user = new Users(data)
    //This is image url returned by middleware
    user.avatar = req.fileUrl
    
    await user.save()

    const { _id, email, avatar } = user
    res.status(201).json({ _id, email, avatar })
}

const deleteUser = async (req, res, next) => {
    const cart = await Carts.deleteOne({ user: req.user._id })
    const user = await Users.deleteOne({ _id: req.user._id })
    res.json({
        message: "User Deleted"
    })
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    const user = await Users.findOne({ email: email }, "email password")
    if (!user) {
        return res.status(404).json({
            message: "User not exists"
        })
    }
    //Checking the password by instance method
    const result = await user.isValidPassword(password)
    if (!result) {
        return res.json({
            message: "Invalid Password"
        })
    }
    //Creating access Token for user
    const accessToken = jwt.sign(user._id.toString(), config.JWT_SECRET)
    res.status(200).json({
        access_token: accessToken
    })

}

module.exports = {
    addUser, login, deleteUser
}