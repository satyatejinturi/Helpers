import express ,{Application,Request,Response}from "express";
import mongoose from "mongoose";
import User from "./models/User"
import dotenv from "dotenv";
dotenv.config();

const connect =async() : Promise<void>=>{
    const mongouri=process.env.MONGO_URL;
    if(!mongouri){
        console.log("MONGO_URL is not defined");
        return;
    }
    try{
        await mongoose.connect(mongouri);
        console.log('mongodb connected');
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}
const app:Application=express();

app.get("/",(req:Request,res:Response)=>{
    res.send("mongo connected")
})

app.get("/data",(req:Request,res:Response)=>{
        
})

app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
})
