const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Cart = require("./cart.js")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, "Please Provide Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Provide Password"],
        trim: true
    },
    avatar: {
        type: String
    }
}, { timestamps: true })


userSchema.methods.getCart = async function(){
    const cart = await Cart.findOne({user:this._id})
    return cart
}

//for checking the password
userSchema.methods.isValidPassword = async function (password) {
    
    return await bcrypt.compare(password, this.password)
}

//for encrypting the password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const hasedPassword = await bcrypt.hash(this.password, 10)
        this.password = hasedPassword
    }
    next()
})


module.exports = new mongoose.model("Users", userSchema)