const {queryWolfram} = require('../API_functions');

const chatRequest = async (req,res) => {
    const {input} = req.query;
    if (input) {
        try {
            let answer = await queryWolfram(input);
            if (answer.data.result == undefined) {
                res.json({Success : false, answer : 'cannot answer'});
            }
            console.log(answer.data.result);
            res.json(answer.data.result);
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = {chatRequest};