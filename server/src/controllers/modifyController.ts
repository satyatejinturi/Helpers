import { Application, Request,Response } from "express";
import User from "../models/User";

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