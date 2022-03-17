const jwt = require("jsonwebtoken")
const Users = require("../models/user.js")
const config = require("../config")

//This is basic jwt authentication for user
const auth = async (req, res, next) => {
    
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Please provide access token"
        })
    }
    const token = req.headers.authorization.split(" ")[1]
    
    const id = jwt.verify(token, config.JWT_SECRET)

    const user = await Users.findOne({ _id: id })
    if (user) {
        req.user = user
        next()
    } else {
        res.status(401).json({
            message: "Unauthorized"
        })
    }
}

module.exports = auth