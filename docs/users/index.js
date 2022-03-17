const login = require("./login");
const signup = require("./signup");

module.exports = {

        "/user/signup": { ...signup },
        "/user/login": { ...login }
    
}