import jwt from 'jsonwebtoken';
import {TokenError} from '../customErrors.js';
import 'dotenv/config';

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token) {
            const token = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
            if (access) {
                next();
            }
            else {
                throw new TokenError('Token could not be validated', 401);
            }
        }
        else {
            throw new TokenError('No token found', 401);
        }
    }
    catch (err) {
        next(err);
        
    }
}

export {auth};