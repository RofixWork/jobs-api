import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { validate } from "email-validator";
import bcryptjs from 'bcryptjs';
import BadRequestAPIError from "../errors/bad-request.js";
import NotFoundAPIError from "../errors/not-found.js";
import UnauthorizedAPIError from "../errors/unauthorized.js";
/**
 * @typedef {import("express").Request} RequestType
 * @typedef {import("express").Response} ResponseType
 */
class AuthController {
    /**
     * Description
     * @param {RequestType} request
     * @param {ResponseType} response
     * @returns {ResponseType}
     */
    static async register(request, response) {        
        let user = await User.create({...request.body});
        const token = user.createJWT()
        return response.status(StatusCodes.CREATED).json({user: {username: user.username}, token});
    }

    /**
     * Description
     * @param {RequestType} request
     * @param {ResponseType} response
     * @returns {ResponseType}
     */
    static async login(request, response) {
        const {email, password} = request.body;

        if(!email?.trim() || !password.trim()) {
            throw new BadRequestAPIError("Please provide email and password")
        }

        if(!validate(email)) {
            throw new BadRequestAPIError("Invalid email address")
        }

        const user = await User.findOne({email});

        if(!user) {
            throw new UnauthorizedAPIError('Email or Password invalid...');
        }

        const comparePassword = await user.checkPassword(password);

        if(!comparePassword) {
            throw new UnauthorizedAPIError('Email or Password invalid...');
        }

        const token = user.createJWT()
        return response.json({user: {username: user.username}, token});
    }
}

export default AuthController;