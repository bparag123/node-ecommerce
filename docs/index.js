const basicDetails = require("./basicDetails")
const servers = require("./servers")
const tags = require("./tags")
const users = require("./users")
const components = require("./components")
const products = require("./products")
const carts = require("./carts")
const categories = require('./categories');

module.exports = {
    ...basicDetails,
    ...servers,
    ...tags,
    ...components,
    paths: {
        ...users,
        ...products,
        ...carts,
        ...categories
    }
}