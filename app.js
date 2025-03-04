const express = require('express');
const {queryWolfram} = require('./API_functions');
const {chatRequest} = require('./Controllers/chatController');
const {processTextInput} = require('./Middleware/stringProcessing')
const axios = require('axios');
const app = express();

//middleware to parse any JSON and process text input
app.use(express.json());
app.use('/query', processTextInput);
//GET request to obtain answer from wolfram alpha API
app.get('/query', chatRequest);

app.listen(5000);
