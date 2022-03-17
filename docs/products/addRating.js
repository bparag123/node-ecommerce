module.exports = {
    // operation's method
    post: {
        security: [{ bearerAuth: [] }],
        tags: ["Product Operations"], // operation's tag
        description: "Rate Product", // short desc
        operationId: "rateProduct", // unique operation id
        parameters: [], // expected params
        requestBody: {
            // expected request body
            content: {
                // content-type
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/RateInput", // user input data model
                    },
                },
            },
        },
        // expected responses
        responses: {
            // response code
            200: {
                description: "Product Rated successfully", // response desc
            },
            // response code
            500: {
                description: "Server error", // response desc
            },
        },
    },
};