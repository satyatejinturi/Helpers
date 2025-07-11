import mongoose,{Document,Schema} from "mongoose";

export interface Ecounter extends Document{
    employeid:number,
    retreivevar:string
}

const counterSchema=new mongoose.Schema(
    {
        employeid:{type:Number,required:true},
        retreivevar:{type:String,required:true}
    }
)

const count=mongoose.model<Ecounter>("employee",counterSchema);
export default count;