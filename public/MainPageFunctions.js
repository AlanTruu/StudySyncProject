
//handling text input
const input = document.querySelector('#testingInput');
function getTextInput() {
    const string = input.value;
    return string;
}

const sendInput = async () => {
    let userInput = document.querySelector('#userInput');
    userInput.innerHTML = '';
    let string = getTextInput();
    
    // Handling user text input
    const textNode = document.createElement('p');
    textNode.textContent = string;
    userInput.appendChild(textNode);
    
    //Handling output
    try {
        outputDiv = document.querySelector('#output');
        outputDiv.innerHTML = '';
        let output = await axios.get('http://localhost:5000/query?input=' + string);
        const newTextNode = document.createElement('p');
        newTextNode.textContent = output.data.result;
        outputDiv.appendChild(newTextNode);
    }
    catch (err) {
        console.log(err);
    }
};

const inputButton = document.querySelector('#inputButton');
inputButton.addEventListener('click', sendInput);