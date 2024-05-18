'use strict'


const statuscode = {
    FORBIDEN: 403,
    CONFLICT: 409,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
}

const reasonStatusCode = {
    FORBIDEN: 'Bad request error',
    CONFLICT: 'Conflict error',
    UNAUTHORIZED: 'Unauthorized error',
    NOT_FOUND: 'Not found error'
}

class ErrorResponse extends Error {

    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = reasonStatusCode.CONFLICT, statusCode = statuscode.CONFLICT) {
        super(message, statusCode);

    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = reasonStatusCode.CONFLICT, statusCode = statuscode.FORBIDEN) {
        super(message, statusCode);

    }
}

class AuthFailureError extends ErrorResponse {
    constructor(message = reasonStatusCode.UNAUTHORIZED, statusCode = statuscode.UNAUTHORIZED) {
        super(message, statusCode);
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message = reasonStatusCode.NOT_FOUND, statusCode = statuscode.NOT_FOUND) {
        super(message, statusCode);
    }
}
class ForbidenError extends ErrorResponse {
    constructor(message = reasonStatusCode.FORBIDEN, statusCode = statuscode.FORBIDEN) {
        super(message, statusCode);
    }
}
module.exports = {
    ConflictRequestError,
    BadRequestError,
    AuthFailureError,
    NotFoundError,
    ForbidenError
}