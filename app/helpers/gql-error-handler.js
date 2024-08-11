const { GraphQLError } = require("graphql");
const { JsonWebTokenError } = require("jsonwebtoken");

const errorCodes = {
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    USER_NOT_ACTIVE: "USER_NOT_ACTIVE",
    DATA_CONFLICT: "DATA_CONFLICT",
    USER_CONFLICT: "USER_CONFLICT",
    BAD_USER_INPUT: "BAD_USER_INPUT",
    BAD_TOKEN: "BAD_TOKEN",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    UNAUTHENTICATED: "UNAUTHENTICATED"
};

const displayErrorCode = (error) => {
    // Mongo DB Conflict Errors
    if (error.message.includes("11000")){
        return errorCodes.DATA_CONFLICT;
        /*
            `Specify mongo db collection conflict error`
            
            const errorMessage = error.message;
                if (errorMessage.includes(".users")) {
                    return errorCodes.USER_CONFLICT;
            }
        */
    }

    // Mongo DB Validation error
    if (error.message.includes("validation failed")) {
        return errorCodes.BAD_USER_INPUT;
    }

    // Apollo GraphQL Errors
    if (error instanceof GraphQLError) {
        const code = error.extensions.code;
        if (code) {
            return code;
        }
    }

    // JWT Validation Errors
    if (error instanceof JsonWebTokenError) {
        return errorCodes.BAD_TOKEN;
    }

    // Common Error
    return errorCodes.INTERNAL_SERVER_ERROR;
};

module.exports = { errorCodes, displayErrorCode }