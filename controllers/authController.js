import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import bcrypt, { compare } from 'bcrypt';

// POST, Register 
export const register = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({ message: "ALl fields are required" })
    }

    // check duplicate 
    const user = await User.findOne({ email: email }).exec();
    if(user){
        return res.status(400).json({ message: "Email already in use" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword })

    if(newUser){
        res.status(200).json({ message: "User created successfully", user: newUser });
    }else {
        res.status(400).json({ message: "Something went wrong" })
    }
})


// POST, Login
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.json({ message: "All fields are required" })
    }

    const user = await User.findOne({ email }).lean();
    if(!user){
        return res.status(400).json({ message: "User not found" })
    }

    const comparePasswords = await bcrypt.compare(password, user.password);
    console.log(comparePasswords);

    if(comparePasswords){
        res.status(200).json({ message: "Logged In Successfully", user });
    }else {
        res.status(401).json({ message: "Wrong Credentials" });
    }
})