import express from 'express';  
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import Joi from "joi";

dotenv.config();
const app = express().use(express.json()).use(cors());

app.listen(process.env.PORT, () => {
    console.log("Server running on port: ".blue.bgBrightGreen + (process.env.PORT).toString().yellow.bgBrightGreen);
});