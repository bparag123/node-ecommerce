module.exports = {
    components: {
        schemas: {
            // id model
            id: {
                type: "string", // data type
                description: "This is a Unique Id", // desc
                example: "dfhgk34535wdqwfjhg", // example of an id
            },
            UserInput: {
                type: "object",
                properties: {
                    email: {
                        type: "string", // data type
                        description: "Email ID", // desc
                        example: "vk@gmail.com",
                        required: true
                    },
                    password: {
                        type: "string", // data type
                        description: "Password"
                    },
                    avatar: {
                        type: "string",
                        format: "binary",
                        description: "Select an Image for avatar"
                    }
                }
            },
            CategoryInput: {
                type: "object",
                properties: {
                    name: {
                        type: "string", // data type
                        description: "Category Name", // desc
                        example: "Electronics",
                        required: true
                    }
                }
            },
            CartInput: {
                type: "object",
                properties: {
                    productId: {
                        type: "string",
                        description: "Product ID", // desc
                        example: "46546fefwefw8797",
                        required: true
                    },
                    quantity: {
                        type: "integer",
                        description: "Quantity", // desc
                        example: "2",
                        required: true
                    }
                }
            },
            SubCategoryInput: {
                type: "object",
                properties: {
                    name: {
                        type: "string", // data type
                        description: "Category Name", // desc
                        example: "Shoes",
                        required: true
                    },
                    parent: {
                        type: "string", // data type
                        description: "Parent Category Name", // desc
                        example: "Footware",
                        required: true
                    }
                }
            },
            ProductInput: {
                type: "object",
                properties: {
                    name: {
                        type: "string", // data type
                        description: "Product Name", // desc
                        example: "Tennis Ball",
                        required: true
                    },
                    category: {
                        type: "string", // data type
                        description: "Category Name", // desc
                        example: "Sports",
                        required: true
                    },
                    price: {
                        type: "integer", // data type
                        description: "Define Price Of Product",
                        required: true
                    },
                    image: {
                        type: "string",
                        format: "binary",
                        required: true
                    }
                }
            },

            RateInput: {
                type: "object",
                properties: {
                    id: {
                        type: "string", // data type
                        description: "Product ID",
                        required: true
                    },
                    review: {
                        type: "string", // data type
                        description: "Add Review Comment", // desc
                        example: "Nice",
                        required: true
                    },
                    score: {
                        type: "integer", // data type
                        description: "Define Price Of Product",
                        required: true
                    }
                }
            }
        },
        requestBodies: {
            CartBody: {
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/CartInput", // user input data model
                        },
                    },
                },
            },
        },
        securitySchemes: {
            bearerAuth: {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        }
    },
};