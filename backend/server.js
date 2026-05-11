import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import userRoutes from "./router/auth.js"

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express()

app.use(express.json());

app.use("/api/users", userRoutes)

connectDB();


app.listen(PORT, () => {
    console.log(`server started at PORT: ${PORT}`)
})






