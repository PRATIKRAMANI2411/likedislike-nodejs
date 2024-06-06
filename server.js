import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";

const app = express();
app.use(bodyParser.json());

const PORT = 5000;
const MONGOURL = "your db"

mongoose.connect(MONGOURL).then(()=>{

    console.log("DB connected successfully");

    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    })

}).catch(error => console.log(error));


app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);