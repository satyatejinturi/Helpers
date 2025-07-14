import { Router, Request,Response } from "express";
const router = Router();
import {deletehelper} from "../controllers/modifyController";

router.delete("/delete",deletehelper);
export default router;