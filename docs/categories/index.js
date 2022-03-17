const createCategory = require("./createCategory");
const createSubCategory = require("./createSubCategory");
const getCategory = require("./getCategory");

module.exports = {
    "/categories/add": {...createCategory},
    "/categories": {...getCategory},
    "/categories/sub-category/add": {...createSubCategory},
}