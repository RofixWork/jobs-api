import UnauthorizedAPIError from "../errors/unauthorized.js";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
/**
 * Description
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 * @returns {import("express").Response}
 */
const authenticateMiddleware = async (request, response, next) => {
    const authHeader = request.headers['authorization'];

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedAPIError("Missing or invalid token");
    }

    const token = authHeader.split(" ")[1];

    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id).select('-password');
        request.user = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        next();
    } catch (error) {
        throw new UnauthorizedAPIError('UNAUTHORIZED...');
    }
}


export default authenticateMiddleware;