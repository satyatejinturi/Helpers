import { Application, Request,Response } from "express";
import User from "../models/User";
import cloudinary from "../utils/cloudinary";
import { profile } from "console";
import fs from "fs";
export const deletehelper =async (req:Request,res:Response)=>{
    try{
        const employee_id=req.query.id;
        const result=await User.deleteOne({employeeid : employee_id});
        if( result.deletedCount==0){
            res.status(400).json(`no employee with ${employee_id}`);
        }
        res.status(200).json(`employee with ${employee_id} deleted`);
    }
    catch(error){
        console.log(error);
        res.status(400).json({message : error});
    }
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

export const edithelper = async (req:Request,res:Response)=>{
    try{
        const files=req.files as {
            [filename:string]: Express.Multer.File[];
        }
        const body=req.body;

        const emp_id=req.query.id;
        const fields=[
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
            'additionalDocType'
        ]
        const updateHelper: any={};
        
        for(const i of fields){
            if(body[i]!==undefined){
                updateHelper[i]=body[i];
            }
        }

        const profilePhoto=files["profile"]?.[0];
        const kycDoc=files["Kyc"]?.[0];
        const additionalDoc=files["AdditionalDoc"]?.[0];
        const profileP= profilePhoto ? await getfileurl(profilePhoto.path,"profile") : "";
        const kycD=kycDoc? await getfileurl(kycDoc.path,"Kyc") : "";
        const addit = additionalDoc ? await getfileurl(additionalDoc.path,"AdditionalDoc") : "";   

        if(profileP!==""){
            updateHelper.profilePhotourl=profileP;
        }
        if(kycD!==""){
            updateHelper.kycDocUrl=kycD;
        }
        if(addit!==""){
            updateHelper.additionalDocUrl=addit;
        }
        for(const i in files){
            const file=files[i][0];
            fs.unlink(file.path,(error)=>{
                console.log(file.path,error);
                if(error) console.log(`error deleting file ${i}`,error);
            })
        }
        
        const user=await User.findOneAndUpdate({employeeid : emp_id},updateHelper,{new:true});
        if(!user){
            res.status(500).json({message : "no user"});
        }
        res.status(200).json(user);
    }
    catch(error){
        console.log(error);
        res.status(400).json({message : error});
    }
}