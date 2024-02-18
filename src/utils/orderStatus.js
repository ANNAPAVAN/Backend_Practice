import mongoose from "mongoose";
const OrderStatus = {
    ORDERED: "ORDERED",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED"
}

export default OrderStatus