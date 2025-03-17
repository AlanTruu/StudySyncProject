// **** Tamagotchi Bot Functions ****
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
        console.error(err);
        window.alert('Request failed', err);
    }
};

const inputButton = document.querySelector('#inputButton');
inputButton.addEventListener('click', sendInput);

// **** Heatmap Functions ****
// Check date and time
setInterval(() => {
    const now = new Date();
}, 1000);

