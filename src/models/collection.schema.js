import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please provide a collection name"],
            trim: true,
            maxLength: [
                120,
                "Collection name should not be more than 120 chars"
            ]
        }
    },
    {timeStamps: true}
);

export default mongoose.model("Collection", collectionSchema)

// saved as -> collections   : everything gets lower case and in plural 