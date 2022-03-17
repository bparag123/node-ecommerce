module.exports = {
    // operation's method
    patch: {
        security: [{ bearerAuth: [] }],
        tags: ["Cart Operations"], // operation's tag
        description: "Remove Product From Cart", // short desc
        operationId: "remove From Cart", // unique operation id
        parameters: [], // expected params
        requestBody: {
            // expected request body
            $ref: "#components/requestBodies/CartBody"
        },
        // expected responses
        responses: {
            // response code
            200: {
                description: "Product removed from Cart successfully", // response desc
            },
        },
    },
};