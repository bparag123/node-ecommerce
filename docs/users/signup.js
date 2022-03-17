module.exports = {
    // operation's method
    post: {
      tags: ["User Operations"], // operation's tag
      description: "Create User", // short desc
      operationId: "createUser", // unique operation id
      parameters: [], // expected params
      requestBody: {
        // expected request body
        content: {
          // content-type
          "multipart/form-data": {
            schema: {
              $ref: "#/components/schemas/UserInput", // user input data model
            },
          },
        },
      },
      // expected responses
      responses: {
        // response code
        200: {
          description: "User created successfully", // response desc
        },
        // response code
        500: {
          description: "Server error", // response desc
        },
      },
    },
  };