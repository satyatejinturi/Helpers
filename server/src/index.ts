import express ,{Application,Request,Response}from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app:Application=express();
import helperRoute from "./routes/helperRoute"
import modifyRoute from "./routes/modifyRoute"
import cors from "cors"

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));


app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
    res.send("Server connected")
})
app.use("/api",helperRoute);
app.use("/api",modifyRoute);

const connect =async() : Promise<void>=>{
    const mongouri=process.env.MONGO_URI;
    if(!mongouri){
        console.log("MONGO_URI is not defined");
        return;
    }
    try{
        await mongoose.connect(mongouri);
        app.listen(3000,()=>{
            console.log("Server is running on http://localhost:3000");
        })
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}
connect();