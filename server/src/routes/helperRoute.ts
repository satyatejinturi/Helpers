import express from "express";
import { Router ,Request,Response} from "express";
import { getHelper ,postHelper, getHelperbySearch} from "../controllers/helperController";
import multer from "multer";
import path from "path";
import upload from "../utils/upload"
const router=Router();

router.get("/allHelpers",getHelper);

router.post("/allHelpers",upload.fields([
        { name: "profile", maxCount: 1 },
        { name: "Kyc", maxCount: 1 },
        { name: "AdditionalDoc", maxCount: 1 },
]),postHelper);

router.get("/search",getHelperbySearch);

export default router;

