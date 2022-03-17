module.exports = {
    // operation's method
    get: {
        security: [{ bearerAuth: [] }],
        tags: ["Cart Operations"], // operation's tag
        description: "Get User Cart Details", // short desc
        operationId: "getCart", // unique operation id
        parameters: [], // expected params
        // expected responses
        responses: {
            // response code
            200: {
                description: "User Carted Fetched Successfully", // response desc
            },
            
        },
    },
};
