const {queryWolfram} = require('../API_functions');


const chatRequest = async (req,res) => {
    //get processed string from req, pass to queryWolfram function to get data
    const input = req.input;
    if (input) {
        try {
            res.setHeader('Access-Control-Allow-Origin', '*');
            let answer = await queryWolfram(input);
            if (answer.data.result == undefined) {
                return res.json({Success : false, answer : 'cannot answer'});
            }
            console.log(answer.data.result);
            return res.json({result : answer.data.result});
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = {chatRequest};