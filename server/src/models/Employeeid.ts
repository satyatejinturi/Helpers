import mongoose,{Document,Schema} from "mongoose";

export interface Ecounter extends Document{
    employeid:number,
    name:string
}

const counterSchema=new Schema<Ecounter>(
    {
        employeid:{type:Number,required:true},
        name:{type:String,required:true}
    }
)

const count=mongoose.model<Ecounter>("employee",counterSchema);
export default count;