module.exports = {
    // operation's method
    post: {
        security: [{ bearerAuth: [] }],
        tags: ["Product Operations"], // operation's tag
        description: "Create Product", // short desc
        operationId: "createProduct", // unique operation id
        parameters: [], // expected params
        requestBody: {
            // expected request body
            content: {
                // content-type
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/ProductInput", // user input data model
                    },
                },
            },
        },
        // expected responses
        responses: {
            // response code
            200: {
                description: "Product created successfully", // response desc
            },
            // response code
            500: {
                description: "Server error", // response desc
            },
        },
    },
};