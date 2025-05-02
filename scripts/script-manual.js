// BREAKFAST SECTION
// Class selectors
const mealTypesContainer = document.querySelector(".meal-types");
const mealOptionsContainer = document.querySelector(".meal-options");
const breakfastButton = document.querySelector(".button.button__bkfast");

// Dish data
let dishes = [];

dishes = fetch("/data/dishes.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load dishes.json");
    return res.json();
  })
  .then((data) => {
    dishes = data;
  })
  .catch((err) => {
    console.error("Error", err);
  });

// Function to create buttons
function createButton(text, className) {
  const button = document.createElement("input");
  button.type = "button";
  button.value = text;
  button.className = className;
  return button;
}

// Function to handle breakfast click
function handleBreakfastClick() {
  // Clear previous options
  mealTypesContainer.innerHTML = "";
  mealOptionsContainer.innerHTML = "";

  // Create the "Sweet" and "Savory" buttons
  const sweetButton = createButton("Sweet", "button button__sweet");
  const savoryButton = createButton("Savory", "button button__savory");

  // Add event listeners to the new buttons
  sweetButton.addEventListener("click", () => showBreakfastOptions("sweet"));
  savoryButton.addEventListener("click", () => showBreakfastOptions("savory"));

  // Append the buttons to the DOM
  mealTypesContainer.appendChild(sweetButton);
  mealTypesContainer.appendChild(savoryButton);
}

// Function to show breakfast options based on type
function showBreakfastOptions(type) {
  // Clear previous options
  mealOptionsContainer.innerHTML = "";

  // Filter the menu data by type
  const filteredOptions = dishes.filter((item) => item.type === type);

  // Create a button for each option
  filteredOptions.forEach((item) => {
    const optionButton = createButton(item.name, `button button__${type}`);

    // Add event listener for when a specific food is selected
    optionButton.addEventListener("click", () => {
      // You can add code here to handle what happens when a specific food is selected
      console.log(`Selected: ${item.name}`);
    });

    mealOptionsContainer.appendChild(optionButton);
  });
}

// Add the onclick event handler to the breakfast button
// Since we're using the HTML onclick attribute, we're setting it programmatically here
breakfastButton.onclick = handleBreakfastClick;
