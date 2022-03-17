module.exports = {
    get: {
        tags: ["Product Operations"], // operation's tag.
        description: "Get Product By Category", // operation's desc.
        operationId: "getProductsByCategory", // unique operation id.
        parameters: [
            {
                in : "path",
                name: "category",
                schema: {
                    type: "string",
                    required:true
                }
            }
        ],
        responses: {
            // response code
            200: {
                description: "OK", // response desc
            },
            // response code
            403: {
                description: "Unauthorized", // response desc
            },
        },
    },
}