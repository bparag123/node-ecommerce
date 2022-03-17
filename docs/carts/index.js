const addToCart = require("./addToCart");
const clearCart = require("./clearCart");
const myCart = require("./myCart");
const removeFromCart = require("./removeFromCart");

module.exports = {
    "/cart/add" : {...addToCart},
    "/cart/mycart" : {...myCart},
    "/cart/clear" : {...clearCart},
    "/cart/remove" : {...removeFromCart},
}