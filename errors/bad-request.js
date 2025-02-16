import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-error.js";

class BadRequestAPIError extends CustomAPIError {
    constructor(message) {
        super(message, StatusCodes.BAD_REQUEST);
    }
}

export default BadRequestAPIError;