import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors/custom-error.js";
/**
 * Error Handler Middleware
 * @param {CustomAPIError} error
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 * @returns {import("express").Response}
 */
const errorHandlerMiddleware = (error, request, response, next) => {
    if(error instanceof Error) {
        return response.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Something went wrong...'})
};
export default errorHandlerMiddleware;