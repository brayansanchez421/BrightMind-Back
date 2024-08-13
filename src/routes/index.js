import { Router } from "express";
const routes = Router();
import auth from "./auth.routes.js";
import users from "./user/index.js";
import courses from './courses/index.js'
import { authRequired } from "../middlewares/auth.middleware.js";

routes.use("https://brightmind-back.onrender.com", auth);
routes.use("https://brightmind-back.onrender.com" , users);
routes.use("https://brightmind-back.onrender.com" , courses);

export default routes;
