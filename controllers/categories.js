const Categories = require("../models/category.js")
const prepareCategory = require("../utils/category.js")


const addCategory = async (req, res, next) => {
    const { name } = req.body;
    const category = new Categories({ name })
    category.children = undefined
    await category.save()
    res.status(201).json(category)
}

const addSubCategory = async (req, res, next) => {

    const { name, parent } = req.body
    //Finding the parent for which we need to add subcategory
    const parentCategory = await Categories.findOne({ name: parent })
    if (!parentCategory) {
        return res.json({
            message: "Parent Category is not Found"
        })
    }

    const newCategory = new Categories({ name })
    //adding category to the childrens of parent
    parentCategory.children.push(name)
    //adding parent category to new category
    newCategory.parent = parentCategory.name
    newCategory.children = undefined

    const [parentData, newData] = await Promise.all([parentCategory.save(), newCategory.save()])
    res.status(201).json({
        message: "added", newData, parentData
    })
}


const getCategories = async (req, res, next) => {
    const categories = await Categories.find()
    // here prepare category is a function which is used to find the hierarchy of categories
    res.json(prepareCategory(categories))
   
}

module.exports = { addCategory, addSubCategory, getCategories }