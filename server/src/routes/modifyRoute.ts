import { Router, Request,Response } from "express";
const router = Router();
import {postHelper, edithelper} from "../controllers/modifyController";
import upload  from "../utils/upload";

router.patch("/editHelper",upload.fields([
        { name: "profile", maxCount: 1 },
        { name: "Kyc", maxCount: 1 },
        { name: "AdditionalDoc", maxCount: 1 },
]),edithelper);

router.post("/allHelpers",upload.fields([
        { name: "profile", maxCount: 1 },
        { name: "Kyc", maxCount: 1 },
        { name: "AdditionalDoc", maxCount: 1 },
]),postHelper);

export default router;