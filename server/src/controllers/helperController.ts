import {Request,Response} from "express";
import User from "../models/User";

export const getHelper = async (req:Request,res:Response)=>{
    try{
        const data=await User.find();
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

