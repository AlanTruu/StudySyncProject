const express = require('express');
const {queryWolfram} = require('./API_functions');
const {chatRequest} = require('./Controllers/chatController');
const axios = require('axios');
const app = express();

app.use(express.json());
//GET request to obtain answer from wolfram alpha API
app.get('/query', chatRequest);

app.listen(5000);
