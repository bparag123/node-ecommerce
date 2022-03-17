const path = require('path');
const dotenv = require("dotenv")
dotenv.config({
    path: path.resolve(__dirname, `./envs/${process.env.NODE_ENV}.env`)
});


module.exports = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN
}