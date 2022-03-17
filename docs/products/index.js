const allproducts = require("./allproducts");
const rated = require("./rated")
const byId = require("./byId")
const catwise = require('./catwise');
const search = require('./search');
const sort = require('./sort');
const productByCategory = require('./productByCategory');
const addProduct = require("./addProduct");
const addRating = require("./addRating");

module.exports = {
        "/products": { ...allproducts },
        "/products/rated": { ...rated },
        "/products/{id}": { ...byId },
        "/products/category-wise": { ...catwise },
        "/products/category/{category}": { ...productByCategory },
        "/products/sort": { ...sort },
        "/products/search": { ...search },
        "/products/search": { ...search },
        "/products/add": { ...addProduct },
        "/products/review/add": { ...addRating },
}