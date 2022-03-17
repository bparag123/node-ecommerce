const mongoose = require("mongoose")

//This will be sub schema
const productInCart = mongoose.Schema({
    id: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Products"
    },
    quantity : Number,
    productTotal : Number
})

//This is virtual property to get the product total
productInCart.virtual("productSum").get(function(){
    return this.id.price * this.quantity
})

const cartSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Users",
        index:true
    },
    cartItems : [productInCart]
})

module.exports = new mongoose.model("Carts", cartSchema)