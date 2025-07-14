import express ,{Application,Request,Response}from "express";
import mongoose from "mongoose";
import User from "./models/User"
import dotenv from "dotenv";
dotenv.config();
import count from "./models/Employeeid";
const app:Application=express();
import Qrcode from "qrcode";
import {v2 as cloudinary } from 'cloudinary';
import helperRoute from "./routes/helperRoute"

app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
    res.send("Server connected")
})


// app.get("/data",async (req:Request,res:Response)=>{
    
// })

app.use("/r",helperRoute);

app.post("/data",async (req : Request,res : Response)=>{
    try{
        const user=new User(req.body);
        await user.save();
        console.log("user posted");
        res.status(201).json("posted");
    }
    catch(error){
        console.log(error);
        res.status(500).json("internal server error");
    }
})


app.get("/data/:name",async (req:Request,res:Response)=>{
    try{
        const {name}=req.params;
        const data=await User.find({name : {
            $regex:name,
            $options:"i"
        }});
        if(data.length==0){
            res.status(404).json({message: "no data"});
            return;
        }
        res.status(200).json(data);
    }
    catch(error){
        console.log(error);
        res.status(500).json("internal server error");
    }
})

app.delete("/delete/:name",async (req:Request,res:Response)=>{
    try{
        const {name}=req.params;
        const count=await User.deleteOne({name:name});
        if(count.deletedCount==0){
            res.status(404).json({message:"no user deleted"});
            return;
        }
        console.log(`user with ${name } deleted`);
        res.status(200).json(count);
    }
    catch(error){
        console.log(error);
        res.status(500).json("internal server error");
    }
})

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


async function getempid(){
    const result=await count.findOneAndUpdate({'retreivevar':"employee"},{$inc : {employeid : 1}});
    if(!result){
        console.log("no result");
        return;
    }
    return result.employeid;
}

app.get("/count",async(req:Request,res:Response)=>{
    try{
        const value=await count.find();
        res.status(200).json(value);
    }
    catch(error){
        console.log(error);
        res.status(500).json("internal server error");
    }
})
app.post("/count",async (req:Request,res:Response)=>{
    try{
        const cont=new count(req.body);
        await cont.save();
        console.log("posted");
        res.status(200).json("posted");
    }
    catch(error){
        console.log(error);
        res.status(500).json("internal server error");
    }
})

async function generateQr(name: string, employeeid: number): Promise<string> {
    const dataforqr = `Name : ${name}, Number : ${employeeid}`;
    console.log(dataforqr);
    const qrcodedata = await Qrcode.toDataURL(dataforqr);
    console.log(qrcodedata);
    return qrcodedata;
}

app.get("/qr",async (req:Request,res:Response)=>{
    try{
        const name=req.query.name as string;
        const eid=parseInt(req.query.eid as string,10);
        console.log(name);
        console.log(eid);
        const qrdata=await generateQr(name,eid);
        console.log(qrdata);
        res.json({qrdata});
    }
    catch(error){
        console.log(error);
        res.status(500).json("internal server error");
    }
})


// async function check() {

//     cloudinary.config({
//         cloud_name:process.env.CLOUD_NAME,
//         api_key: process.env.API_KEY,
//         api_secret:process.env.API_SECRET
//     })
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
// }
// check();
    
    





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
