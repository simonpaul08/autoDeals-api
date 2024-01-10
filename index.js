import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDB from './config/connectToDb.js'; 
import corsOptions from './config/corsOptions.js';
import AuthRoutes from './routes/authRoutes.js';
import QueryRoutes from './routes/queryRoutes.js';
import mongoose from 'mongoose';

dotenv.config();
connectToDB();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares 
app.use(cors(corsOptions));
app.use(express.json());


// routes 
app.get('/', (req, res) => {    
    res.send("Server is running");
})

app.use('/api/auth', AuthRoutes);
app.use('/api/query', QueryRoutes)


app.listen(PORT, () => {
    mongoose.connection.once('open', () => {
        console.log('Connected To DB');
        console.log(`server running on port ${PORT}`);
    })
})
