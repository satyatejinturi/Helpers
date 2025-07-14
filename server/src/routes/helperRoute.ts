import express from "express";
import { Router ,Request,Response} from "express";
const router=Router();
import { getHelper ,postHelper, getHelperbySearch} from "../controllers/helperController";
import multer from "multer";
import path from "path";

const storage=multer.diskStorage({
    destination: "uploads/",
    filename:(_req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage});


router.get("/allHelpers",getHelper);

router.post("/allHelpers",upload.fields([
        { name: "profile", maxCount: 1 },
        { name: "Kyc", maxCount: 1 },
        { name: "AdditionalDoc", maxCount: 1 },
]),postHelper);

router.get("/search",getHelperbySearch);

export default router;

