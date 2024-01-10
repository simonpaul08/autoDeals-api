import asyncHandler from 'express-async-handler';
import Query from '../models/Query.js';

export const query = asyncHandler(async (req, res) => {
    const { name, email, query } = req.body;

    if(!name || !email || !query) {
        return res.status(400).json({ message: "ALl fields are required" })
    }

    const newQuery = await Query.create({ name, email, query });

    if(newQuery){
        res.status(200).json({ message: "Submitted successfully" })
    }else {
        res.status(400).json({ message: "Something went wrong" })
    }
})