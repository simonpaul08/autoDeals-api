import { Router } from "express";
import { query } from "../controllers/queryController.js";


const router = Router();

router.route('/')
    .post(query)


export default router