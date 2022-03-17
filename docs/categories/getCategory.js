module.exports = {
    get: {
        tags: ["Category Operations"], // operation's tag.
        description: "Get Categories", // operation's desc.
        operationId: "getCategories", // unique operation id.
        parameters: [],
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