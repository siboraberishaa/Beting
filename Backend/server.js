import path from "path";
import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
// import productRoutes from "./routes/productRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// import partnerRoutes from "./routes/partnerRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import newsletterRoutes from "./routes/newsletterRoutes.js";
import transferRoutes from './routes/transferRoutes.js';
import rolesRoutes from './routes/rolesRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'
// import cron from 'node-cron';
// import { backUpDB } from "./backupDB.js";

connectDB();


const port = process.env.PORT;
const app = express();

app.use(cors());



//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//cookie parser middleware-allows us to access request.cookies. to access we need tto get cookie.parser.jwt
app.use(cookieParser());

// app.use("/api/products", productRoutes);
// app.use("/api/category", categoryRoutes);
// app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/transfers", transferRoutes);
// app.use("/api/partners", partnerRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/newsletter", newsletterRoutes);

// const __dirname = path.resolve(); //set __dirname to current directory
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
    app.get("/", (req, res) => {
        res.send("API is running....");
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running....");
    });
}

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Origin', 'https://666752e32425d13171ff62a0--fastidious-licorice-0d9011.netlify.app');
    res.sendStatus(200);
});





app.listen(port, () => console.log(`server running on port ${port}`));
