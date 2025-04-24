import jwt from 'jsonwebtoken';
import {TokenError} from '../customErrors.js';
import 'dotenv/config';

//Simple authentication middleware, after cookie parser parses the cookies which are in json format
//get token, use jwt.verify to compare 
//if decoded, should send the user data to next middleware
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token) {
            jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, function(err, decoded) {
                console.log(decoded);
                next();
            });
        }
        else {
            throw new TokenError('No token found or jwt verification === false', 401);
        }
        
    }
    catch (err) {
        return next(err);
    }
}

export {auth};