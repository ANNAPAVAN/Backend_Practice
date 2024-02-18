import mongoose from "mongoose"
import OrderStatus from "../utils/orderStatus.js"

const orderSchema = new mongoose.Schema({
    product: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product" // export default mongoose.model("Product", productSchema)
                },
                count:Number,
                price: Number
            }
        ],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  //export default mongoose.model("User", userSchema); 
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    coupon: String,
    transactionId: String,
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.ORDERED
    }
},{timestamps: true})

export default mongoose.model("Order", orderSchema)