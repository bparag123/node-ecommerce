module.exports = {
    // operation's method
    post: {
        tags: ["User Operations"], // operation's tag
        description: "User Login", // short desc
        operationId: "loginUser", // unique operation id
        parameters: [], // expected params
        requestBody: {
            // expected request body
            content: {
                // content-type
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            email: {
                                type: "string", // data type
                                description: "Email ID", // desc
                                example: "vk@gmail.com",
                                required: true
                            },
                            password: {
                                type: "string", // data type
                                description: "Password",
                                required: true
                            },
                        }
                    },
                },
            },
        },
        // expected responses
        responses: {
            // response code
            200: {
                description: "Logged In Successfully", // response desc
            },
            // response code
            403: {
                description: "Unauthorized", // response desc
            },
        },
    },
};