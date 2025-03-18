import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// const path = require('path');
//sends the index html file to user for main
const main = (req,res) => {
    const pathToIndex = path.resolve(__dirname, '../index.html');
    res.sendFile(pathToIndex);
};

// module.exports = {main};
export {main};