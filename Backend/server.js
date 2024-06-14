import path from "path";
import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import transferRoutes from './routes/transferRoutes.js';
import rolesRoutes from './routes/rolesRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import financeRoutes from './routes/financeRoutes.js';

connectDB();

const port = process.env.PORT || 5000;
const app = express();

const corsOptions = {
    origin: ['https://website-665aeeac.ameba-rks.com', 'https://666cb2f5e04051d4e29de3a6--admirable-creponne-e5f66c.netlify.app'], // replace with your actual origin
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Your routes here
app.use("/api/users", userRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/finances", financeRoutes);

if (process.env.NODE_ENV === "production") {
    app.get("/", (req, res) => {
        res.send("API is running....");
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running....");
    });
}

app.listen(port, () => console.log(`Server running on port ${port}`));
