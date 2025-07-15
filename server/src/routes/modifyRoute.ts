import { Router, Request,Response } from "express";
const router = Router();
import {deletehelper, edithelper} from "../controllers/modifyController";
import upload  from "../utils/upload";
router.delete("/delete",deletehelper);

router.patch("/editHelper",upload.fields([
        { name: "profile", maxCount: 1 },
        { name: "Kyc", maxCount: 1 },
        { name: "AdditionalDoc", maxCount: 1 },
]),edithelper);


export default router;