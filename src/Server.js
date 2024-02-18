// server.js
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import config from "./config/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// MongoDB connection
(async () => {
    try {
        await mongoose.connect(config.MONGODB_URL);
        console.log('DB CONNECTED !!');

        const onListening = () => {
            console.log(`Listening on port ${config.PORT}`);
        };
        app.listen(config.PORT, onListening);

    } catch (err) {
        console.log("ERROR : ", err);
        throw err;  // to stop application here
    }
})();

app.use("/api", routes);

app.get("/", (_req, res) => {
    console.log("anna pavan");
    res.send("Hello there ANNAPAVAN --- Api");
});

app.all("*", (_req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route is not Found"
    });
});

export default app;
