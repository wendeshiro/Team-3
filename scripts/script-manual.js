// Assuming the button is already in your HTML and has the class "meal-types"
const mealTypes = document.querySelector(".meal-types");

mealTypes.addEventListener("click", handleMealTypesContainerClick);
// Function to handle the button click

// Function to create "savory" and "sweet" breakfast option buttons
function createBkfastType(text, className) {
  const button = document.createElement("input");
  button.type = "button";
  button.value = text;
  button.className = `button ${className}`; // Add the class
  return button;
}

function handleMealTypesContainerClick() {
  // Add the event listener to the "Breakfast Menu" button
  // Create the "Sweet" button
  const sweetButton = createBkfastType("Sweet", "button button__sweet"); // Add specific class
  // Create the "Savory" button
  const savoryButton = createBkfastType("Savory", "button button__savory"); // Add specific class

  // Append the buttons to the DOM (e.g., after the breakfast button)
  mealTypes.appendChild(sweetButton, mealTypes);
  mealTypes.appendChild(savoryButton, sweetButton); // Insert after sweet

  // Remove the event listener to prevent multiple button creations on subsequent clicks.
  mealTypes.removeEventListener("click", handleMealTypesContainerClick);
}
