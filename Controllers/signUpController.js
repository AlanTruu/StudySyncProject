/*
    TO DO: Error handling, redirecting the user when sign up/ login fails for whatever reason

*/

import * as path from 'path';
import {EmailError} from '../customErrors.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { signNewUser, login} from '../database.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

//sends the user a sign up page
const sendSignUpPage = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../sign-up.html')
)};

//function that will process form data, and then redirect the user to main page if verified
//function is called in sign up form, so it expects Femail, Fusername, Fpassword in the request body
//TO DO: Since the fields are already required in the form, maybe validate the email's existence
const signUp = async (req, res, next) => {
    try {
        //check that the fields are filled
        const email = req.body.Femail;
        const username = req.body.Fusername;
        const plainTextPass = req.body.Fpassword;
        
        if (email && username && plainTextPass) {
            const signSuccessful = await signNewUser([email, username, plainTextPass]);
            if (signSuccessful) {
                res.redirect('/main');
            }
            else if (!signSuccessful) {
                throw new EmailError('email in use baka', 401);
            }
        }
        else {
            //should probably reload the page here because not all fields were filled in 
            console.log('field is missing');
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
                res.redirect('/main');
            }
            else {
                //Here, what to do when login is not succesful?
                //probably should just reload page, but how?
                res.send('Login attempt unsuccessful');
            }
        }
        catch (error){
            next(error);
        }
    }
    else {
        console.log('signUpController.js 58 all fields not filled');
        //do something here if fields are not filled
    }
}

export {signUp, sendSignUpPage, sendLoginPage, loginUser};