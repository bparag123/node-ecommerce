const Carts = require("../models/cart.js")
const Products = require("../models/product.js")

const addToCart = async (req, res, next) => {

    const { productId, quantity } = req.body

    let [productData, existingCart] = await Promise.all([Products.findOne({ _id: productId }), req.user.getCart()])
    //checking if the product is available or not
    if (!productData) {
        return res.json({
            message: "Invalid Product"
        })
    }

    //new object to be added into list
    let productObj = {
        id: productData._id,
        quantity: quantity
    }

    //If cart found with logged in user the modify it
    if (existingCart) {

        //Finding if the product is already added
        let oldProductIndex = existingCart.cartItems.findIndex((product) => {
            return product.id.toString() === productData._id.toString()
        }
        )
        //if product not found then push it into cart items
        if (oldProductIndex < 0) {
            existingCart.cartItems.push(productObj)
        }
        //if found then only increment the quantity
        else {
            existingCart.cartItems[oldProductIndex].quantity += quantity
        }
        //modify the quantity of the product

        await existingCart.save()
        res.json(existingCart)
    }
    //creating new fresh Cart
    else {
        const data = {
            user: req.user._id,
            cartItems: [productObj]
        }
        const newCart = new Carts(data)
        await newCart.save()
        return res.json(newCart)
    }
}

const clearCart = async (req, res, next)=>{
    await Carts.deleteOne({user: req.user._id})
    res.status(202).json({
        message: "Cart Cleared"
    })
}

const myCart = async (req, res, next) => {

    //Joining the product data for the every cart items
    const cartData = await Carts
        .aggregate()
        .match(
            { user: req.user._id }
        )
        .unwind("$cartItems")
        .lookup({ from: 'products', localField: 'cartItems.id', foreignField: '_id', as: 'products' })
        .unwind("$products")
        //Projecting and getting extract from data
        .project({
            productName: "$products.name",
            productID: "$products._id",
            productPrice: "$products.price",
            quantity: "$cartItems.quantity",
            productTotal: { $multiply: ["$products.price", "$cartItems.quantity"] }
            , _id: 0
        })

    let cartTotal = 0
    //calculating the total amount of cart
    cartData.forEach((product) => {
        cartTotal += product.productTotal
    })
    res.json({ cartData, cartTotal })
}

const removeFromCart = async (req, res, next) => {
    const { productId, quantity } = req.body
    let [productData, cart] = await Promise.all([Products.findOne({ _id: productId }), req.user.getCart()])
    if (!cart) {
        return res.json({
            message: "cart not found"
        })
    }
    if (!productData) {
        return res.json({
            message: "product not found"
        })
    }
    //Finding the product from the cart items
    const cartProductIndex = cart.cartItems.findIndex((product) => {
        return product.id.toString() === productData._id.toString()
    })
    
    if (cartProductIndex < 0) {
        return res.json({
            message: "product not found in cart"
        })
    }
    else {
        cartQuantity = cart.cartItems[cartProductIndex].quantity
        if (cartQuantity < quantity) {
            return res.json({
                message: "Invalid removal"
            })
        } else if (cartQuantity === quantity) {
            //remove product object from cartItems
            cart.cartItems.splice(cartProductIndex, 1)
            await cart.save()
        }
        else {
            //decrease quantity of product Object
            cart.cartItems[cartProductIndex].quantity -= quantity
            await cart.save()
        }
        res.json({ cart })
    }
}
module.exports = {
    addToCart, myCart, removeFromCart, clearCart
}