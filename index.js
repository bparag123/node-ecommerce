const config = require("./config")
const app = require("./app")
const PORT = config.PORT

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`);
})
