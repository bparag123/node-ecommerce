const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide Name Of Product"],
        trim: true,
        unique:true
    },
    price: {
        type: Number,
        min: 0,
        required: [true, "Please Provide Price"]
    },
    //Temporary this is a String but will modify with reference to another collection for category
    category: {
        type: String,
        required: [true, "Please Provide Category"],
        index: true
    },
    image: String,
    isActive: {
        type: Boolean,
        default: true,
        index: true
    },
    rating: [
        {
            user: String,
            review: String,
            score: Number
        }
    ],

}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})

//This is virtual for calculating the average rating
productSchema.virtual("averageRating").get(function () {
    const len = this.rating.length
    if (len === 0) {
        return 0
    }
    else {
        const totalRating = this.rating.reduce((total, element) => {
            return total += element.score
        }, 0)
        return (totalRating/len).toFixed(1)
    }
})

module.exports = new mongoose.model("Products", productSchema)