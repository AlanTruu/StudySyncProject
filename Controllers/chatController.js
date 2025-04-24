import {queryWolfram} from '../API_functions.js';


const chatRequest = async (req, res, next) => {
    //get processed string from req, pass to queryWolfram function to get data
    const input = req.input;
    if (input) {
        try {
            res.setHeader('Access-Control-Allow-Origin', '*');
            
            let answer = await queryWolfram(input);
            
            if (answer.data.result == undefined) {
                return res.json({Success : false, answer : 'cannot answer'});
            }
            
            return res.json({result : answer.data.result});
        }
        catch (err) {
            return next(err);
        }
    }
}

export {chatRequest};