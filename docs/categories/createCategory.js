module.exports = {
  // operation's method

  post: {
    security: [{ bearerAuth: [] }],
    tags: ["Category Operations"], // operation's tag
    description: "Create Category", // short desc
    operationId: "createCategory", // unique operation id
    parameters: [], // expected params
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CategoryInput", // user input data model
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "Category created successfully", // response desc
      },
      
    },
  },
};