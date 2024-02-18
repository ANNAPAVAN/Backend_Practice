import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import routes from "./routes/index.js"

const app = express()
// console.log("Entering into app.js")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

app.use("/api",routes)

app.get("/",(_req,res)=>{
    console.log("anna pavan")
    res.send("Hello there ANNAPAVAN --- Api")
})

app.all("*",(_req,res) => {
    return res.status(404).json({
        success: false,
        message: "Route is not Found"
    })
})

export default app;

//          http://localhost:4000/api/auth/login
//          http://localhost:4000/api/auth/logout