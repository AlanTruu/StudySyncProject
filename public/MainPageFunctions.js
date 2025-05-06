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
  
    const year = 2025;
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const tasks = {};
  
    const monthSelector = document.createElement("select");
    monthSelector.style.marginBottom = "10px";
    monthNames.forEach((name, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.text = name;
      monthSelector.appendChild(option);
    });
    calendarDiv.appendChild(monthSelector);
  
    const title = document.createElement("h2");
    title.style.textAlign = "center";
    title.style.fontSize = "20px";
    title.style.marginBottom = "8px";
    calendarDiv.appendChild(title);
  
    function renderCalendar(year, month) {
      const oldGrid = document.getElementById("calendar-grid");
      if (oldGrid) oldGrid.remove();
  
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthName = monthNames[month];
      title.innerText = `${monthName} ${year}`;
  
      const grid = document.createElement("div");
      grid.classList.add("calendar-grid");
      grid.id = "calendar-grid";
  
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const lastDatePrevMonth = new Date(year, month, 0).getDate();
      const totalCells = 42;
      let dayCount = 0;
  
      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        const prevDate = new Date(year, month, -(i - 1));
        const prevDayName = prevDate.toLocaleString("default", { weekday: "short" });
        const prevDayNum = lastDatePrevMonth - i;
  
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("calendar-day", "inactive");
        dayDiv.innerHTML = `<strong>${prevDayName}</strong><br><small>${prevDayNum}</small>`;
        grid.appendChild(dayDiv);
        dayCount++;
      }
  
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const dayName = date.toLocaleString("default", { weekday: "short" });
        const key = `${month + 1}-${i}`;
  
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("calendar-day");
        dayDiv.innerHTML = `<strong>${dayName}</strong><br>${i}`;
  
        if (tasks[key]) {
          dayDiv.innerHTML += `<br><small>${tasks[key]}</small>`;
        }
  
        dayDiv.addEventListener("click", function () {
          const task = prompt(`Enter task for ${dayName}, ${monthName} ${i}, ${year}:`);
          if (task) {
            tasks[key] = task;
            dayDiv.innerHTML = `<strong>${dayName}</strong><br>${i}<br><small>${task}</small>`;
          }
        });
  
        grid.appendChild(dayDiv);
        dayCount++;
      }
  
      for (let i = 1; dayCount < totalCells; i++) {
        const nextDate = new Date(year, month + 1, i);
        const nextDayName = nextDate.toLocaleString("default", { weekday: "short" });
  
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("calendar-day", "inactive");
        dayDiv.innerHTML = `<strong>${nextDayName}</strong><br><small>${i}</small>`;
        grid.appendChild(dayDiv);
        dayCount++;
      }
  
      calendarDiv.appendChild(grid);
    }
  
    const defaultMonth = 2;
    monthSelector.value = defaultMonth;
    renderCalendar(year, defaultMonth);
  
    monthSelector.addEventListener("change", (e) => {
      const selectedMonth = parseInt(e.target.value);
      renderCalendar(year, selectedMonth);
    });
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