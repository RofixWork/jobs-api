import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = Router()

authRouter.route('/register').post(AuthController.register)
authRouter.route('/login').post(AuthController.login)

export default authRouter;