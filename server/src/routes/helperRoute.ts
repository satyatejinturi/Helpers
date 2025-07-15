import express from "express";
import { Router ,Request,Response} from "express";
import { getHelper ,deletehelper, getHelperbySearch} from "../controllers/helperController";
import multer from "multer";
import path from "path";
import upload from "../utils/upload"
const router=Router();

router.get("/allHelpers",getHelper);
router.delete("/delete",deletehelper);
router.get("/search",getHelperbySearch);

export default router;

