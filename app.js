const express = require('express');
const {queryWolfram} = require('./API_functions');
const {chatRequest} = require('./Controllers/chatController');
const {main} = require('./Controllers/mainController');
const {signUp, sendSignUpPage} = require('./Controllers/signUpController');
const {processTextInput} = require('./Middleware/stringProcessing')
const path = require('path');
const axios = require('axios');
const app = express();

//middleware to parse any JSON and process text input, process form input
app.use(express.json());
app.use('/query', processTextInput);
app.use(express.urlencoded({extended : false}));


//GET request to obtain answer from wolfram alpha API
app.get('/query', chatRequest);

//sign up page
app.get('/', sendSignUpPage);

//main page that users will see once logged in
app.use('/main', express.static('./public'));
app.get('/main', main);

//sign up page, will redirect user to main once they login
app.post('/signup', signUp)

app.listen(5000);
