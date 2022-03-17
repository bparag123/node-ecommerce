const request = require("supertest")
const app = require("../app.js")
const User = require("../models/user")


beforeAll(async()=>{
    await Promise.all([User.deleteMany()])
    const user = new User({
        email:"test@test.com",
        password:"1",
        avatar:"hgdkjhgwkjh"
    })
    user.save()
})


const signUpTest = async () => {
    const user = await request(app)
        .post("/user/signup")
        .send({
            email:"a@a.a",
            password:"a"
        })
        .expect(201)
}
test("Create User", signUpTest)

const loginTest = async ()=>{
    const user = await request(app)
        .post("/user/login")
        .send({
            email:"test@test.com",
            password:"1"
        })
        .expect(200)
        expect(user.body).toHaveProperty('access_token')
        return Promise.resolve(user.body.access_token)
}

test("Login User", loginTest)

