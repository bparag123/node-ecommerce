module.exports = {
    get: {
        tags: ["Product Operations"], // operation's tag.
        description: "Sort Products", // operation's desc.
        operationId: "sortProducts", // unique operation id.
        parameters: [
            {
                in : "query",
                name: "name",
                schema: {
                    type: "string",
                    enum: ["asc", "desc"]
                }
            },
            {
                in : "query",
                name: "category",
                schema: {
                    type: "string",
                    enum: ["asc", "desc"]
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