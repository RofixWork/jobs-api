import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-error.js";

class NotFoundAPIError extends CustomAPIError {
    constructor(message) {
        super(message, StatusCodes.NOT_FOUND);
    }
}

export default NotFoundAPIError;