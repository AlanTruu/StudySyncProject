import axios from 'axios';
import 'dotenv/config'
const queryWolfram = async (queryInput) => {
    try {
        const answer = await axios.get(process.env.WOLFRAM_API_KEY + queryInput);
        return answer;
    }
    catch (err) {
        console.log(err);
    }
};

export {queryWolfram};