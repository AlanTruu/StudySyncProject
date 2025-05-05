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

// **** Calendar ****
document.addEventListener("DOMContentLoaded", function () {
    const calendarDiv = document.getElementById("calendar");

    if (!calendarDiv) {
        console.error("Error: #calendar div not found!");
        return;
    }

    console.log("Finalizing calendar layout...");

    const year = 2025;
    const month = 2; // March (0-based index)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthName = new Date(year, month, 1).toLocaleString("default", { month: "long" });

    // Store tasks
    const tasks = {};

    // Create title
    const title = document.createElement("h2");
    title.innerText = `${monthName} ${year}`;
    title.style.textAlign = "center";
    title.style.fontSize = "20px"; // Slightly smaller
    title.style.marginBottom = "8px";
    calendarDiv.appendChild(title);

    // Create calendar grid
    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(7, 1fr)"; // 7 equal columns for weekdays
    grid.style.gap = "4px"; // Slightly reduced gap for compactness
    grid.style.maxWidth = "500px"; // Shrink width to fit grid
    grid.style.margin = "0 auto"; // Centers it

    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const dayName = date.toLocaleString("default", { weekday: "short" }); // e.g., Sun, Mon

        const dayDiv = document.createElement("div");
        dayDiv.style.border = "2px solid black";
        dayDiv.style.padding = "5px"; // Smaller padding
        dayDiv.style.textAlign = "center";
        dayDiv.style.cursor = "pointer";
        dayDiv.style.minHeight = "60px"; // Compact height
        dayDiv.style.display = "flex";
        dayDiv.style.flexDirection = "column";
        dayDiv.style.justifyContent = "center";
        dayDiv.style.alignItems = "center";
        dayDiv.style.fontSize = "12px"; // Smaller font size
        dayDiv.style.backgroundColor = "#d9d9d9"; // Soft background
        dayDiv.style.width = "65px"; // Prevent large boxes

        dayDiv.innerHTML = `<strong>${dayName}</strong><br>${i}`;

        // Click event to add a task
        dayDiv.addEventListener("click", function () {
            const task = prompt(`Enter task for ${dayName}, March ${i}, ${year}:`);
            if (task) {
                tasks[i] = task; // Store task
                dayDiv.innerHTML = `<strong>${dayName}</strong><br>${i}<br><small style="font-size: 10px; color: blue;">${task}</small>`;
            }
        });

        grid.appendChild(dayDiv);
    }

    calendarDiv.appendChild(grid);
});

// **** Heatmap ****
const heatmapGrid = document.getElementById("heatmapGrid");
const gridSize = 36; // Number of squares in the grid

for (let i = 0; i < gridSize; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.dataset.index = i; // Stores index for later use
    heatmapGrid.appendChild(square);
}

document.addEventListener('DOMContentLoaded', () => { // Ensure DOM is loaded before runnning script
    const grid = document.querySelector('.heatmapGrid');

    // Generate array of squares attached to grid elements
    grid.innerHTML = Array.from({ length: gridSize }).map((_, i) => '<div class="square" data-index="${i}"></div>').join('');

    // Add event listeners to each square
    grid.addEventListener('click', e => {
        const sq = e.target;
        if (!sq.classList.contains('square')) return; // Ignore clicks outside squares
        sq.classList.toggle('active'); // Toggle active class
    });

});