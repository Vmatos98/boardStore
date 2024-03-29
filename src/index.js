import express from 'express';  
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import Joi from "joi";

import categoriesRoutes from './routes/categoriesRoutes.js';
import gamesRoutes from './routes/gamesRoutes.js';
import customersRoutes from './routes/customersRoutes.js';
import rentalsRoutes from './routes/rentalsRoutes.js';

dotenv.config();
const app = express().use(express.json()).use(cors());
app.use(categoriesRoutes).use(gamesRoutes).use(customersRoutes).use(rentalsRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server running on port: ".blue.bgBrightGreen + (process.env.PORT).toString().yellow.bgBrightGreen);
});