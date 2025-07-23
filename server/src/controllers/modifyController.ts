import { Request,Response } from "express";
import User from "../models/User";
import cloudinary from "../utils/cloudinary";
import fs from "fs";
import count, { Ecounter } from "../models/Employeeid";
import  QRCode  from "qrcode";

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
    console.log(req.body)
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
    try{
            
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
        console.log(newhelper);
        await newhelper.save();
        res.status(200).json(newhelper);
    }
    catch(error){
        console.log(error);
        res.status(500).json("internal server error");
    }
}

export const edithelper = async (req: Request, res: Response) => {
  try {
    const files = (req.files || {}) as {
      [filename: string]: Express.Multer.File[];
    };
    const body = req.body;
    const emp_id = req.query.id;

    const fields = [
      'typeOfService',
      'organizationName',
      'fullName',
      'languages',
      'gender',
      'phno',
      'email',
      'vehicleType',
      'vehicleNo',
      'kycDocType',
      'additionalDocType',
    ];

    const updateHelper: any = {};
    for (const i of fields) {
      if (body[i] !== undefined) {
        updateHelper[i] = body[i];
      }
    }

    const profilePhoto = files["profile"]?.[0];
    const kycDoc = files["Kyc"]?.[0];
    const additionalDoc = files["AdditionalDoc"]?.[0];

    const profileP = profilePhoto ? await getfileurl(profilePhoto.path, "profile") : "";
    const kycD = kycDoc ? await getfileurl(kycDoc.path, "Kyc") : "";
    const addit = additionalDoc ? await getfileurl(additionalDoc.path, "AdditionalDoc") : "";

    if (profileP !== "") updateHelper.profilePhotourl = profileP;
    if (kycD !== "") updateHelper.kycDocUrl = kycD;
    if (addit !== "") updateHelper.additionalDocUrl = addit;

    // Delete temp files
    for (const key in files) {
      const file = files[key][0];
      fs.unlink(file.path, (error) => {
        if (error) console.log(`error deleting file ${key}`, error);
      });
    }

    const user = await User.findOneAndUpdate({ employeeid: emp_id }, updateHelper, { new: true });
    if (!user) return res.status(500).json({ message: "no user" });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
};
