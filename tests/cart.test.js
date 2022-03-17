const request = require("supertest")
const app = require("../app.js")
const Cart = require("../models/cart.js")
const Category = require("../models/category.js")
const Product = require("../models/product.js")
const User = require("../models/user")
let Token
let productId
beforeAll(async () => {
    /*Creating Fake User, Category and Product for performing
        Valid Cart Operations
    */
    let user = new User({
        email: "cart@gmail.com",
        password: "1",
        avatar: "djjhgjhg"
    })
    let category = new Category({
        name: "Test Cart"
    })
    const [newUser, newCategory, _] = await Promise.all([user.save(), category.save(), Cart.deleteMany()])

    let product = new Product({
        name: "Test Cart",
        category: newCategory.name,
        price: "500"
    })
    const [login, newProduct] = await Promise.all([request(app).post("/user/login").send({
        email: newUser.email,
        password: "1"
    }).expect(200), product.save()])
    Token = login.body.access_token
    productId = newProduct._id
})

describe("Cart Operations", () => {

    test("add Product to Cart", async () => {
        const response = await request(app)
            .post("/cart/add")
            .set('authorization', `bearer ${Token}`)
            .send({
                "productId": productId,
                "quantity": 5
            })
            .expect(200)
        expect(response.body.cartItems[0].quantity).toBe(5)
    })
    test("Remove Product From Cart", async () => {
        const response = await request(app)
            .patch("/cart/remove")
            .set('authorization', `bearer ${Token}`)
            .send({
                "productId": productId,
                "quantity": 1
            })
            .expect(200)
        expect(response.body.cart.cartItems[0].quantity).toBe(4)

    })
    test("Get Cart Details", async () => {
        const response = await request(app)
            .get("/cart/mycart")
            .set('authorization', `bearer ${Token}`)
            .expect(200)
    })
    test("Clear Cart", async () => {
        const response = await request(app)
            .delete("/cart/clear")
            .set('authorization', `bearer ${Token}`)
            .expect(202)
        expect(response.body).toEqual({ message: 'Cart Cleared' })
    })
})


