module.exports = {
    // operation's method
    delete: {
        security: [{ bearerAuth: [] }],
        tags: ["Cart Operations"], // operation's tag
        description: "Clear", // short desc
        operationId: "clearCart", // unique operation id
        parameters: [], // expected params
        // expected responses
        responses: {
            // response code
            202: {
                description: "Cart Cleared successfully", // response desc
            },
        },
    },
};
