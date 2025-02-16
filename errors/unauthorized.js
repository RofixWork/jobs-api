import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-error.js";

class UnauthorizedAPIError extends CustomAPIError {
    constructor(message) {
        super(message, StatusCodes.UNAUTHORIZED);
    }
}

export default UnauthorizedAPIError;