
//handling text input
const input = document.querySelector('#testingInput');
function getTextInput() {
    const string = input.value;
    return string;
}

// function processTextInput(string) {
//     string = string.replaceAll(/ /g, '%20');
//     string = string.replaceAll(/\\/g, '%5c');
//     return string;
// }

const sendInput = async () => {
    let string = getTextInput();
    
    //string = processTextInput(string);
    
    // Handling user text input
    const textNode = document.createElement('p');
    textNode.textContent = string;
    console.log(textNode.textContent);
    document.querySelector('#output').appendChild(textNode);
    
    //Handling output
    try {
        let output = await axios.get('http://localhost:5000/query?input=' + string);
        const newTextNode = document.createElement('p');
        newTextNode.textContent = output.data.result;
        document.querySelector('#output').appendChild(newTextNode);
    }
    catch (err) {
        console.log(err);
    }
};

const inputButton = document.querySelector('#inputButton');
inputButton.addEventListener('click', sendInput);