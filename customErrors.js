class EmailError extends Error {
    constructor (message, statusCode) {
        super(message)
        this.statusCode = statusCode;
    }
}

class TokenError extends Error {
    constructor (message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export {EmailError, TokenError};