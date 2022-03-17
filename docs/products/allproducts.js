module.exports = {
    get: {
        tags: ["Product Operations"], // operation's tag.
        description: "Get Products", // operation's desc.
        operationId: "getProducts", // unique operation id.
        parameters: [
            {
                in : "query",
                name: "limit",
                schema: {
                    type: "integer"
                }
            },
            {
                in : "query",
                name: "page",
                schema: {
                    type: "integer"
                }
            },
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