module.exports = {
    get: {
        tags: ["Product Operations"], // operation's tag.
        description: "Search Products", // operation's desc.
        operationId: "searchProducts", // unique operation id.
        parameters: [
            {
                in : "query",
                name: "search",
                schema: {
                    type: "string"
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