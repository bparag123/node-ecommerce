module.exports = {
  // operation's method
  post: {
    security: [{ bearerAuth: [] }],
    tags: ["Category Operations"], // operation's tag
    description: "Create Sub Category", // short desc
    operationId: "createSubCategory", // unique operation id
    parameters: [], // expected params
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/SubCategoryInput", // user input data model
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "Sub Category created successfully", // response desc
      },
      
    },
  },
};