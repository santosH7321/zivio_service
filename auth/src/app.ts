import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose.connect(process.env.DB!)
.then(() => {
    console.log("Auth - Database is running")
})

.catch(() => {
    console.log("Auth - Failed to connect with database");
})

import express from "express";
import morgan from "morgan"
import cors from "cors"

const app = express();
app.listen(process.env.PORT, () => {
    console.log(`Auth service running on ${process.env.PORT}`)
})

app.use(cors({
    origin: process.env.CLIENT,
    credentials: true
}))

app.use(morgan('dev'));

app.get("/", (req, res) =>{
    res.send("Hello from auth service")
})
