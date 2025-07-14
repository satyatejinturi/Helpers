import {Application,Request,Response} from "express";
import User from "../models/User";
import  QRCode  from "qrcode";
import count, { Ecounter } from "../models/Employeeid";
import { error, profile, timeStamp } from "console";
import cloudinary from "../utils/cloudinary"
import { Query } from "mongoose";
import fs from "fs";

async function generateQr(name: string, employeeid: number | undefined): Promise<string> {
    const dataforqr = `Name : ${name}, Number : ${employeeid}`;
    const qrcodedata = await QRCode.toDataURL(dataforqr);
    return qrcodedata;
}

async function getempid(){
    const result : Ecounter | null=await count.findOneAndUpdate({'name':"employee"},{$inc : {employeid : 1}},{new:true});
    if(!result){
        console.log("no result");
        return;
    }
    return result.employeid;
}

async function getfileurl(localpath:string , folder:string
):Promise<string> {
    try{
        const result=await cloudinary.uploader
                .upload(localpath,{folder})

        return result.secure_url;
    }catch(error){
        console.log(error);
        return "";
    }
}

export const postHelper = async (req:Request,res:Response)=>{
    const employeeid=await getempid();
    const {
        typeOfService,
        organizationName,
        fullName,
        languages,
        gender,
        phno,
        email,
        vehicleType,
        vehicleNo,
        kycDocType,
        additionalDocType
    }=req.body;

    const qrcode=await generateQr(fullName,employeeid);
    const qrcodeUrl=qrcode
    const files=req.files as {
        [filename:string]: Express.Multer.File[];
    }

    const profilePhoto=files["profile"]?.[0];
    const kycDoc=files["Kyc"]?.[0];
    const additionalDoc=files["AdditionalDoc"]?.[0];

    const profilePhotourl= profilePhoto ? await getfileurl(profilePhoto.path,"profile") : "";
    const kycDocUrl=kycDoc? await getfileurl(kycDoc.path,"Kyc") : "";
    const additionalDocUrl = additionalDoc ? await getfileurl(additionalDoc.path,"AdditionalDoc") : "";
    
    for(const i in files){
        const file=files[i][0];
        fs.unlink(file.path,(error)=>{
            if(error) console.log(`error deleting file ${i}`,error);
        })
    }
    
    const newhelper = new User({
        employeeid,
        profilePhotourl,
        typeOfService,
        organizationName,
        fullName,
        languages: Array.isArray(languages) ? languages : [languages],
        gender,
        phno,
        email,
        vehicleType,
        vehicleNo,
        kycDocType,
        kycDocUrl,
        additionalDocType,
        additionalDocUrl,
        qrcodeUrl 
    })
    await newhelper.save();
    res.status(200).json({employeeid, profilePhotourl,organizationName,phno,timeStamp,typeOfService,qrcodeUrl});
}

export const getHelper = async (req:Request,res:Response)=>{
    try{
        const data=await User.find();
        console.log(data);
        if(data.length==0){
            res.send("no data");
            return;
        }
        res.json(data);
    }
    catch(error){
        console.log(error);
        res.send("error");
    }
}

export const getHelperbySearch = async (req: Request, res: Response) => {
    try {
        const query = req.query.query;

        if (typeof query !== 'string' || !query.trim()) {
            return res.status(400).json("invalid search query");
        }

        const is_num = /^\d+$/.test(query);
        const searchQuery = new RegExp(query, "i");

        const searchcommand:any[]=[
            { fullName : {$regex : searchQuery}},
            { phno : {$regex : searchQuery}},   
        ]
        if(is_num){
            searchcommand.push({employeeid : Number(query)})
        }

        const user =await User.aggregate(
            [
                { $match :{
                        $or : searchcommand
                    }
                }
            ]
        )
        res.status(200).json(user);
    }
    catch(error){
        console.log(error);
        res.status(400).json({message : error});
    }
}