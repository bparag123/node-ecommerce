require("./db.js")
const express = require("express")
// require("./fakeDataGenerate.js")
const productRouter = require("./routes/product.js")
const userRouter = require("./routes/user.js")
const cartRouter = require("./routes/cart.js")
const categoryRouter = require("./routes/categories.js")
const swagger = require("swagger-ui-express")
const docs = require("./docs")
const app = express()

//Supporting Body as a Json Data
app.use(express.json())

app.use("/api-docs", swagger.serve, swagger.setup(docs))
app.use("/products", productRouter)
app.use("/user", userRouter)
app.use("/cart", cartRouter)
app.use("/categories", categoryRouter)

module.exports = app
