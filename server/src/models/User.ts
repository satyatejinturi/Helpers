import mongoose,{Document,Schema} from "mongoose";


export interface IUser extends Document{
    employeeid:number,
    profilePhotourl:string,
    typeOfService:string,
    organizationName:string,
    fullName:string,
    languages:Array<string>,
    gender:string,
    phno:number,
    email:string,
    vehicleType:string,
    vechicleNo:number,
    kycDocUrl:string,
    additionalDocType:string,
    additionalDocUrl:string,
}

const UserSchema=new mongoose.Schema({
    employeeid:{type:Number,required:true},
    profilePhotourl:{type : String },
    typeOfService:{type : String , required: true},
    organizationName:{type : String , required: true},
    fullName:{type : String , required: true},
    gender:{type : String , required: true},
    phno:{type:Number,required:true},
    email:{type : String },
    vehicleType:{type : String},
    vehicleNo:{type:Number},
    kycDocType:{type : String , required: true},
    kycDocUrl:{type : String , required: true},
    additionalDocType:{type : String },
    additionalDocUrl:{type : String },
},{timestamps:true});

const User=mongoose.model<IUser>("user",UserSchema,"test");
export default User;