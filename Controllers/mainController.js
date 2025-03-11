const path = require('path');

//sends the index html file to user for main
const main = (req,res) => {
    const pathToIndex = path.resolve(__dirname, '../index.html');
    res.sendFile(pathToIndex);
};

module.exports = {main};