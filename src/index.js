import express from 'express';  
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import Joi from "joi";

import categoriesRoutes from './routes/categoriesRoutes.js';

dotenv.config();
const app = express().use(express.json()).use(cors());
app.use(categoriesRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server running on port: ".blue.bgBrightGreen + (process.env.PORT).toString().yellow.bgBrightGreen);
});