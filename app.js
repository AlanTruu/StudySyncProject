import express from 'express';
import {queryWolfram} from './API_functions.js';
import {chatRequest} from './Controllers/chatController.js';
import {main} from './Controllers/mainController.js';
import {signUp, sendSignUpPage, sendLoginPage, loginUser} from './Controllers/signUpController.js';
import {processTextInput} from './Middleware/stringProcessing.js';
import {errorHandler} from './Middleware/errorHandler.js';
import * as path from 'path';
import axios from 'axios';

const app = express();

//middleware to parse any JSON and process text input, process form input
app.use(express.json());
app.use('/query', processTextInput);
app.use(express.urlencoded({extended : false}));


//GET request to obtain answer from wolfram alpha API
app.get('/query', chatRequest);

//sign up page
app.get('/', sendSignUpPage);
app.get('/login', sendLoginPage);

//main page that users will see once logged in
app.use('/main', express.static('./public'));
app.get('/main', main);

//post requests for signup/login form actions
app.post('/signup', signUp);
app.post('/login', loginUser);

app.use(errorHandler);
//TO DO: look into wrapping async controllers in middleware rather than using try/catch constantly in async funcs
app.listen(5000);
