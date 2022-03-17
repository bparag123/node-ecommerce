const upload = require("../middlewares/uploadFile")
//This is mocking the uploadFile library
//Here jest.fn() is a place which says that it can be implemented by mockImplementation
jest.mock("../middlewares/uploadFile", () => {
    return jest.fn()
})
upload.mockImplementation((req, res, next) => {
    next()
})