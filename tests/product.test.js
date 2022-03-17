const request = require("supertest")
const app = require("../app.js")
const Product = require("../models/product")
const Categories = require("../models/category")
let Token;
let category;

/**
 * Creating new Category and user to get access_token for authentication
 */
beforeAll(async () => {
    const cat = new Categories({
        name: "Electronics"
    })
    const [user, _, newCategory] = await Promise.all([request(app)
        .post("/user/login")
        .send({
            email: "test@test.com",
            password: "1"
        })
        .expect(200), Product.deleteMany(), cat.save()])
    expect(user.body).toHaveProperty('access_token')
    Token = user.body.access_token
    category = newCategory.name

})


describe("Products Operations", () => {
    let productId
    describe("Post Operations", () => {

        test("add Product", async () => {
            const response = await request(app)
                .post("/products/add")
                .set('authorization', `bearer ${Token}`)
                .send({
                    category: category,
                    name: "Bat",
                    price: "500"
                })
                .expect(200)
            expect(response.body.product.name).toBe("Bat")
            productId = response.body.product._id
        })

        test("Rating Should be added", async () => {
            const response = await request(app).post("/products/review/add")
                .set('authorization', `bearer ${Token}`)
                .send({
                    "id": productId,
                    "review": "ohoooohooooo",
                    "score": "4.5"
                }).expect(200)
            expect(response.body).toEqual({ message: 'Rating Successfull' })

        })
    })
    describe("Product Get Operations", () => {
        test("Getting Products", async () => {
            const response = await request(app).get("/products?limit=1&page=1").expect(200)
            expect(response.body).toHaveProperty("products")
        })

        test("Get all Rated Products", async () => {
            const response = await
                request(app)
                    .get("/products/rated?limit=1&page=1&sort=asc")
                    .expect(200)
            expect(response.body).toHaveProperty("products")
        })

        test("Get Product by Id", async () => {
            const response = await
                request(app)
                    .get(`/products/${productId}`)
                    .expect(200)
            expect(response.body._id).toBe(productId)

        })

        test("Get Products of Specific Category", async () => {
            const response = await
                request(app)
                    .get(`/products/category/${category}`)
                    .expect(200)

        })

        test("Get all Products Category-wise", async () => {
            const response = await
                request(app)
                    .get(`/products/category-wise`)
                    .expect(200)

        })
        test("Search Products", async () => {
            const response = await
                request(app)
                    .get(`/products/search?search=${category}`)
                    .expect(200)

        })
        test("Sort Products", async () => {
            const response = await
                request(app)
                    .get(`/products/sort?name=asc&category=desc`)
                    .expect(200)
        })
    })
    describe("Patch Product To Remove", () => {
        test("Remove Product", async () => {

            const response = await request(app).patch("/products/remove")
                .set('authorization', `bearer ${Token}`)
                .send({
                    "productId": productId
                }).expect(202)
            expect(response.body).toEqual({ message: 'Product Deleted' })

        })
    })


})

