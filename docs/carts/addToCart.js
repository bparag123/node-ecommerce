module.exports = {
    // operation's method
    post: {
        security: [{ bearerAuth: [] }],
        tags: ["Cart Operations"], // operation's tag
        description: "Add Product to Cart", // short desc
        operationId: "addToCart", // unique operation id
        parameters: [], // expected params
        requestBody: {
            // expected request body
            $ref: "#components/requestBodies/CartBody"
        },
        // expected responses
        responses: {
            // response code
            200: {
                description: "Product added to Cart successfully", // response desc
            },
            
        },
    },
};