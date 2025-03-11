//process text to input into wolfram alpha API query
function processTextInput(req, res, next) {
    let {input} = req.query;
    if (input && typeof input === 'string') {
        input = input.replaceAll(/ /g, '%20');
        input = input.replaceAll(/\\/g, '%5c');
        req.input = input;
    }
    next(); 
}

module.exports = {processTextInput};