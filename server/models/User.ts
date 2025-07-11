import mongoose,{Document,Schema} from "mongoose";
import { Interface } from "readline";

export interface IUser extends Document{
    name:String
}

const UserSchema=new mongoose.Schema({
    name:{type : String , required: true}
});

const User=mongoose.model<IUser>("user",UserSchema);

export default User;