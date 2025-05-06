import {EmailError, TokenError} from '../customErrors.js';

//error handler middleware
const errorHandler = (error, req, res, next) => {
    //if email is already in use or invalid, send back the error message
    if (error instanceof EmailError) {
        res.status(error.statusCode);
        return res.json({success: false, msg : error.message});
    }
    
    //if error is related to the authentication token, send back the error message
    if (error instanceof TokenError) {
        return res.status(error.statusCode).send(error.message);
    }

    //if the error was none of the previous, send generic message
    return res.status(400).send(error.message);
}


export {errorHandler};