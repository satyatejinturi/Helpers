import {Application,Request,Response} from "express";
import User from "../models/User";
import  QRCode  from "qrcode";
import count, { Ecounter } from "../models/Employeeid";
import { error, profile, timeStamp } from "console";
import cloudinary from "../utils/cloudinary"
import { Query } from "mongoose";

async function generateQr(name: string, employeeid: number | undefined): Promise<string> {
    
    const dataforqr = `Name : ${name}, Number : ${employeeid}`;

    const qrcodedata = await QRCode.toDataURL(dataforqr);
    console.log(qrcodedata);
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
    console.log(employeeid);
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
    const additionalDocUrl = additionalDoc ? await getfileurl(additionalDoc.path,"AdditionalDoc") : ""
    
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
        //const sent=Json.parse(data);
        res.json(data);
    }
    catch(error){
        console.log(error);
        res.send("error");
    }
}

export const getHelperbySearch = async (req: Request, res: Response) => {
    try {
        const query = req.query.query || req.params.query;
        if (!query || typeof query !== 'string') {
            return res.status(500).json("invalid search query");
        }
        const searchQuery = new RegExp(query, "i");
        const user =await User.findOne({
            $or: [
                { fullName: searchQuery },
                { phno: searchQuery },
                
            ]
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({message : error});
    }
}