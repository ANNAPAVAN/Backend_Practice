import dotenv from "dotenv"

dotenv.config()

// console.log("Entering into config")

const config = {
    PORT: process.env.PORT || 4000,
    MONGODB_URL : process.env.MONGODB_URL || "mongodb+srv://pavananna:Mongodb134@new.bes8xs6.mongodb.net/ecomm",
    JWT_SECRET : process.env.JWT_SECRET || "yoursecret",
    JWT_EXPIRY : process.env.JWT_EXPIRY || "30d"

} 

export default config