import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import RoutesApp from "./routes/index.js";
import { connectDB } from "./db.js";
import cors from 'cors';
import morgan from "morgan";


const app = express();

dotenv.config();



// ToDo: app.on()
app.use(cors({
<<<<<<< HEAD
    origin: 'https://plataformabrightmind.netlify.app',
=======
    origin: 'https://plataformbrightmind.netlify.app',
>>>>>>> 99ad67a75ddb4af635dcdf840771e2d255c8bc5f
    credentials: true

}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use("/PE", RoutesApp);



export default app;
