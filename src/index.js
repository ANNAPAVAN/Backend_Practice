import mongoose from "mongoose";
import express from "express";
import config from "./config/index.js";


const app = express();  


// MongoDB connection
(async () => {
    try {
        await mongoose.connect(config.MONGODB_URL);
        console.log('DB CONNECTED !!');

        app.on('error', (err) => {
            console.error("ERROR: ", err);
            throw err;
        });

        const onListening = () => {
            console.log(`Listening on port ${config.PORT}`);
        };
        app.listen(config.PORT, onListening);

        // app.get("/",(req,res)=>{
        //     res.send("mongo");
        // })

    } catch (err) {
        console.log("ERROR : ", err);
        throw err;  
    }
})();
