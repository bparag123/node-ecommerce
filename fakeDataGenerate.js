const faker = require('faker')
const Product = require("./models/product.js")

const createProducts = async () => {
    const data = []
    for (let i = 0; i < 500; i++) {

        const name = faker.commerce.productName()
        const price = faker.commerce.price()
        const category = "Mobiles"
        data.push({
            name, price, category
        })
    }
    Product.insertMany(data)
        .then(
            () => {
                console.log("Inserted");
            }
        )
}

createProducts()
