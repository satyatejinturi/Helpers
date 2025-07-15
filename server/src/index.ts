import express ,{Application,Request,Response}from "express";
import mongoose from "mongoose";
import User from "./models/User"
import dotenv from "dotenv";
dotenv.config();
const app:Application=express();
import helperRoute from "./routes/helperRoute"
import modifyRoute from "./routes/modifyRoute"
app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
    res.send("Server connected")
})

app.use("/api",helperRoute);
app.use("/api",modifyRoute);

app.put("/edit/:name",async(req:Request,res:Response)=>{
    try{
        const {name}=req.params;
        const result=await User.findOneAndUpdate({name:name},req.body,{new:true,overwrite:true})
        if(!result){
            res.status(404).json({message: `no user with ${name}`})
            return;
        }
        res.status(200).json("user updated");
    }
    catch(error){
        console.log(error);
        res.status(500).json("internal server error");
    }
})

app.patch("/edit/:name",async (req:Request,res:Response)=>{
    try{
        const {name}=req.params;
        const result=await User.findOneAndUpdate({name:name},{$set: req.body},{new:true,overwrite:true})
        if(!result){
            res.status(404).json({message: `no user with ${name}`})
            return;
        }
        res.status(200).json("user updated");
    }
    catch(error){
        console.log(error);
        res.status(500).json("internal server error");
    }
})


const connect =async() : Promise<void>=>{
    const mongouri=process.env.MONGO_URI;
    if(!mongouri){
        console.log("MONGO_URI is not defined");
        return;
    }
    try{
        await mongoose.connect(mongouri);
        console.log('mongodb connected');
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