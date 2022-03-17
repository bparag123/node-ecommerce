const request = require("supertest")
const app = require("../app.js")
const Categories = require("../models/category")

let category;
//Creating New Category for testing to add sub category
beforeAll(async()=>{
    const cat = new Categories({
        name: "Clothes"
    })
    const [_, newCategory] =await Promise.all([Categories.deleteMany(), cat.save()])
    category = newCategory.name
})

describe("Category Operations", ()=>{

    test("Add Category", async ()=> {
        const response = await request(app).post("/categories/add").send({
            "name": "Sports"
        }).expect(201)
        expect(response.body.name).toBe("Sports")
        
    })
    test("Add Sub Category Category", async ()=> {
        const response = await request(app).post("/categories/sub-category/add").send({
            "name": "Jeans",
            "parent":category
        }).expect(201)
        expect(response.body.message).toBe("added")
        
    })
    test("Get All Categories", async ()=>{
        const response = await request(app).get("/categories").expect(200)
    })
})
