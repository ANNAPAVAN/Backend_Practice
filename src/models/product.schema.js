import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true ,"please provide product name"],
        trim: true,
        maxLength: [120, "product name should be < 120 chars"]
    },
    price: {
        type: Number,
        required: [true ,"please provide product price"],
        maxLength: [5, "product price should be < 5 chars"]
    },
    description: {
        type: String
    },
    photos: [
        {
            secure_url: {
                type: String,
                required: true
            }
        }
    ],
    stock: {
        type: Number,
        default:0
    },
    sold: {
        type: Number,
        default:0
    },
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        // what collection i am reffering to....
        ref: "Collection"  // export default mongoose.model("Collection", collectionSchema)
    }
} , {timestamps: true})

export default mongoose.model("Product", productSchema)