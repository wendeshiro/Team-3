// BREAKFAST BUTTON INSERTION SECTION

// Class selectors
const mealTypesContainer = document.querySelector(".meal-types");
const breakfastButton = document.querySelector(".button.button__bkfast"); // Fixed selector with dot

// Function to create "savory" and "sweet" breakfast option buttons
function createBkfastType(text, className) {
  const button = document.createElement("input");
  button.type = "button";
  button.value = text;
  button.className = className; // Class is already formatted in the parameter
  return button;
}

// Make this function available for the HTML onclick attribute
function handleBreakfastClick() {
  // Create the "Sweet" and "Savory" buttons
  const sweetButton = createBkfastType("Sweet", "button button__sweet");
  const savoryButton = createBkfastType("Savory", "button button__savory");

  // Append the buttons to the DOM
  mealTypesContainer.appendChild(sweetButton);
  mealTypesContainer.appendChild(savoryButton);

  // Since we're using onclick in HTML, no need to add/remove event listeners
  // If we still want to prevent multiple clicks, we could disable the button:
  breakfastButton.disabled = true;
}
