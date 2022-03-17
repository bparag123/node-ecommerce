const { default: mongoose } = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Please Provide Category Name"],
        trim: true
    },
    parent: {
        type: String,
        index: true
    },
    children: [String]
})


module.exports = mongoose.model("Categories", categorySchema)