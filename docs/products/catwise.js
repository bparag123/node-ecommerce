module.exports = {
    get: {
        tags: ["Product Operations"], // operation's tag.
        description: "Category Wise", // operation's desc.
        operationId: "getProductsCatWise", // unique operation id.
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