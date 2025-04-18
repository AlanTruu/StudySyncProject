import {EmailError, TokenError} from '../customErrors.js';

const errorHandler = (error, req, res, next) => {
    if (error instanceof EmailError) {
        return res.status(error.statusCode).send(error.message);
    }
    
    if (error instanceof TokenError) {
        return res.status(error.statusCode).send(error.message);
    }
    return res.status(400).send(error.message);
}


export {errorHandler};