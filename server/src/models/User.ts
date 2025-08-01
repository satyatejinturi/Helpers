import mongoose,{Document,Schema} from "mongoose";

export interface IUser extends Document{
    employeeid:number,
    profilePhotourl?:string,
    typeOfService:string,
    organizationName:string,
    fullName:string,
    languages:string[],
    gender:string,
    phno:string,
    email?:string,
    vehicleType:string,
    vechicleNo?:string,
    kycDocType:string,
    kycDocUrl:string,
    additionalDocType?:string,
    additionalDocUrl?:string,
    qrcodeUrl:string
}


const UserSchema=new mongoose.Schema({
    employeeid:{type:Number,required:true,unique:true},
    profilePhotourl:{type : String },
    typeOfService:{type : String , required: true},
    organizationName:{type : String , required: true},
    fullName:{type : String , required: true},
    languages: [{ type: String ,required:true}],
    gender:{type : String , required: true},
    phno:{type:String,required:true},
    email:{type : String },
    vehicleType:{type : String},
    vehicleNo:{type:String},
    kycDocType:{type : String , required: true},
    kycDocUrl:{type : String , required: true},
    additionalDocType:{type : String },
    additionalDocUrl:{type : String },
    qrcodeUrl:{type: String,required:true}
},{timestamps:true});

const User=mongoose.model<IUser>("user",UserSchema,"test");
export default User;