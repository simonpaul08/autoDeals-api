import { Router } from "express";
import { login, register } from "../controllers/authController.js";

const router = Router();

// register
router.route('/register')
    .post(register)

// login
router.route('/login')
    .post(login)


export default router;