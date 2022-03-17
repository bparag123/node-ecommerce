const Products = require('../models/product.js');
const Categories = require('../models/category.js');

//getRatedProducts
const getRatedProducts = async (req, res, next) => {
    const sortKey = req.query.sort === "asc" ? 1 : -1
    const dataPerPage = +req.query.limit
    const pageToDisplay = +req.query.page
    //counting the documents to skip
    const elementsToSkip = dataPerPage * (pageToDisplay - 1)
    const [count, data] = await Promise.all([
        Products.find({ isActive: true, rating: { $ne: [] } }).count(),
        Products.aggregate().match({ "rating": { $ne: null } }).unwind("$rating")
            .group({
                '_id': '$name',
                'id': { '$first': '$_id' },
                'name': { '$first': '$name' },
                'category': {
                    '$first': '$category'
                },
                'reviews': {
                    '$push': {
                        'user': '$rating.user',
                        'review': '$rating.review',
                        'score': '$rating.score'
                    }
                },
                'rating': {
                    '$avg': '$rating.score'
                }
            }).project({ _id: 0 }).sort({ 'rating': sortKey }).skip(elementsToSkip).limit(dataPerPage)
    ])

    const totalPage = Math.ceil(count / dataPerPage)
    //Adding the data to further process pagination
    req.dataToPaginate = { data, totalPage }
    next()
}

//Finding products for the given category
const productsOfCategory = async (req, res, next) => {
    const name = req.params.name
    const category = await Categories.findOne({name})
    
    if(!category){
        return res.json({
            message:"Category not found"
        })
    }
    const products = await Products.aggregate().match({ isActive: true , category:name})
    res.json(products)
}

//Category wise Products
const getProductsByCategory = async (req, res, next) => {
    const products = await Products.aggregate()
        .match({ isActive: true })
        .group({
            '_id': '$category',
            "category":{
                $first : "$category"
            },
            'products': {
                '$push': {
                    "_id":"$_id",
                    'name': '$name',
                    'rating': '$rating',
                    'price': '$price'
                }
            }
        })
        .project({_id:0})
    res.json(products)
}

//Getting all products
const getAllProducts = async (req, res, next) => {
    const dataPerPage = +req.query.limit
    const pageToDisplay = +req.query.page
    //counting the documents to skip
    const elementsToSkip = dataPerPage * (pageToDisplay - 1)
    const [data, count] = await Promise.all([
        Products.find({ isActive: true }).skip(elementsToSkip).limit(dataPerPage),
        Products.find({ isActive: true }).count()
    ])

    const totalPage = Math.ceil(count / dataPerPage)
    req.dataToPaginate = { data, totalPage }
    next()
}

//Add review to any products
const addReview = async (req, res, next) => {
    const { id, review, score } = req.body
    const product = await Products.findOne({ _id: id, isActive: true })
    if (!product) {
        return res.json({
            message: "Product not Found"
        })
    }
    if (product.rating === undefined) {
        product.rating = [{ user: req.user._id.toString(), review, score }]
        await product.save()
        return res.json({
            message: "Rating Successfull"
        })
    }
    const ratingIndex = product.rating.findIndex(element => {
        return element.user.toString() === req.user._id.toString()
    })
    //If user rated in past
    if (ratingIndex >= 0) {
        return res.json({
            message: "Already rated."
        })
    }

    product.rating.push({ user: req.user._id.toString(), review, score })
    await product.save()
    res.json({
        message: "Rating Successfull"
    })
}

const sortProducts = async (req, res, next) => {
    const sortKeys = req.query
    //Arranging all the key, value pais as 1 or -1 based on asc/desc
    Object.keys(sortKeys).map((key) => {
        if (sortKeys[key] === "asc") {
            sortKeys[key] = 1
        }
        else if (sortKeys[key] === "desc") {
            sortKeys[key] = -1
        }
    })
    try {
        const products = await Products.find({ isActive: true }).sort(sortKeys)
        return res.json(products)
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

const getProductById = async (req, res, next) => {
    const id = req.params.id

    if (!id) {
        return res.json({
            message: "Please provide ID"
        })
    }
    const product = await Products.findOne({ _id: id, isActive: true })
    if(!product){
        return res.json({
            message: "Product not found"
        })
    }
    res.json(product)
    
}

const addProduct = async (req, res, next) => {

    const data = req.body
    const category = req.body.category

    //Finding the category

    const categoryCount = await Categories.find({ name: category }).count()

    if (categoryCount === 0) {
        return res.json({
            message: "Please provide a valid category"
        })
    }

    const product = new Products(data)
    //req.fileUrl is a url for uploaded image
    product.image = req.fileUrl
    await product.save()
    res.json({ product })
}

const searchProducts = async (req, res, next) => {

    const searchKey = req.query.search
    //Simple regular expression to find the product from database
    const regex = new RegExp(`${searchKey}`)

    //Querying the product to get match from category or name
    const products = await Products.find({ isActive: true }).or([
        { name: { $regex: regex, $options: "i" } },
        { category: { $regex: regex, $options: "i" } }
    ]).select({ __v: 0, isActive: 0 })

    if (products.length === 0) {
        return res.json({
            message: `No Data Found for '${searchKey}'`
        })
    }
    res.json(products)
}

//Removing product
const removeProduct = async (req, res, next) => {
    const id = req.body.productId

    const product = await Products.findOne({ _id: id })

    if (!product) {
        return res.status(404).json({
            message: "Product not exists"
        })
    }
    product.isActive = false
    await product.save()
    res.status(202).json({
        message: "Product Deleted"
    })
}

module.exports = {
    getAllProducts,
    getProductById,
    sortProducts,
    addProduct,
    searchProducts,
    removeProduct,
    addReview,
    getRatedProducts,
    getProductsByCategory,
    productsOfCategory
}