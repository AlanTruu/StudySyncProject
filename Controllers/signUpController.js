/*
    TO DO: Error handling, redirecting the user when sign up/ login fails for whatever reason

*/

import * as path from 'path';
import {EmailError, loginError} from '../customErrors.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { signNewUser, login} from '../database.mjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
const __dirname = dirname(fileURLToPath(import.meta.url));

//sends the user a sign up page
const sendSignUpPage = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../sign-up.html')
)};

const jwtSign = (res, email) => {
    const user = {name : email};
    jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, {expiresIn : '1h'}, function(err, token) {
        if (err) {
            throw err;
        }
        
        res.clearCookie('token', { httpOnly : true})
        res.cookie('token', token, { httpOnly : true});
        return res.json({success : true, url : '/main'});
    });
}

//function that will process form data, and then redirect the user to main page if verified
//function is called in sign up form, so it expects Femail, Fusername, Fpassword in the request body
//TO DO: Since the fields are already required in the form, maybe validate the email's existence
const signUp = async (req, res, next) => {
    try {
        const email = req.body.Femail;
        const username = req.body.Fusername;
        const plainTextPass = req.body.Fpassword;
        
        if (email && username && plainTextPass) {
            const signSuccessful = await signNewUser([email, username, plainTextPass]);
            
            if (signSuccessful) {
                jwtSign(res, req.body.Femail);
            }
            else {
                // res.json({success: false});
                throw new EmailError('Email in use already!', 400);
            }
        }  
    }
    catch (err) {
        return next(err)
    }
}

const sendLoginPage = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../login.html'));
}

//loginUser function expects that the request body contains string email and plainTextPass, returns void
const loginUser = async (req, res, next) => {
    const email = req.body.Femail;
    const plainTextPass = req.body.Fpassword;

    if (email && plainTextPass) {
        try {
            const loginSuccessful = await login([email, plainTextPass]);
            
            if (loginSuccessful) {
                jwtSign(res, req.body.Femail);
                console.log('login successful');
            }
            else {
                console.log('else')
                throw new loginError('Invalid username or password', 401);
            }
        }
        catch (error){
            next(error);
        }
    }
}

export {signUp, sendSignUpPage, sendLoginPage, loginUser};