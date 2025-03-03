const axios = require('axios');

const queryWolfram = async (queryInput) => {
    try {
        const answer = await axios.get('http://api.wolframalpha.com/v1/conversation.jsp?appid=4QTY77-HW6Q8HKV52&i=' + queryInput);
        return answer;
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = {queryWolfram};