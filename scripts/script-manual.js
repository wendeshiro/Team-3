// BREAKFAST SECTION
// Class selectors - FIXED SELECTORS
const breakfastButton = document.querySelector(".button.button__bkfast"); // Added dot before button
const insertingDiv = document.querySelector(".inserting-div"); // Added dot for class selector

// Add debugging to check if elements were found
console.log("Breakfast button found:", breakfastButton);
console.log("Inserting div found:", insertingDiv);

// Define mealOptionsContainer in global scope so it's accessible in all functions
let mealOptionsContainer;

// Dish data fetching
let dishes = [];

fetch("/data/dishes.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load dishes.json");
    return res.json();
  })
  .then((data) => {
    dishes = data;
    console.log("Dishes loaded successfully:", data);
  })
  .catch((err) => {
    console.error("Error loading dishes:", err);
  });

// Function to create buttons
function createButton(text, className) {
  const button = document.createElement("input");
  button.type = "button";
  button.value = text;
  button.className = className;
  return button;
}

// Subheader making
function createSubheader(text) {
  const subheader = document.createElement("h2");
  subheader.className = "subheading";
  subheader.textContent = text;
  return subheader;
}

// Function to handle breakfast click
function handleBreakfastClick() {
  console.log("Breakfast button clicked");

  // Check if insertingDiv exists before proceeding
  if (!insertingDiv) {
    console.error("Error: insertingDiv not found in the document");
    return;
  }

  // Clear previous content from the inserting div
  insertingDiv.innerHTML = "";

  // Create the meal options container
  mealOptionsContainer = document.createElement("div");
  mealOptionsContainer.className = "meal-options";
  insertingDiv.appendChild(mealOptionsContainer);

  // Create and append the editable subheader
  const subheaderText = "Choose a type";
  const subheader = createSubheader(subheaderText);
  mealOptionsContainer.appendChild(subheader);

  // Create the "Sweet" and "Savory" div and buttons
  const mealTypeDiv = document.createElement("div");
  mealTypeDiv.className = "meal-types";
  const sweetButton = createButton("Sweet", "button button__sweet");
  const savoryButton = createButton("Savory", "button button__savory");

  // Add event listeners to the new buttons
  sweetButton.addEventListener("click", () => showBreakfastOptions("sweet"));
  savoryButton.addEventListener("click", () => showBreakfastOptions("savory"));

  // Append the buttons to the DOM
  mealTypeDiv.appendChild(sweetButton);
  mealTypeDiv.appendChild(savoryButton);

  // Append the mealTypeDiv to the visible container
  mealOptionsContainer.appendChild(mealTypeDiv);

  console.log("Breakfast options setup complete");
}

// Function to show breakfast options based on type
function showBreakfastOptions(type) {
  console.log(`Showing ${type} breakfast options`);

  // Check if mealOptionsContainer exists
  if (!mealOptionsContainer) {
    console.error("Error: mealOptionsContainer not found");
    return;
  }

  // Clear previous options
  mealOptionsContainer.innerHTML = "";

  // Create and append the subheader
  const subheaderText =
    type === "sweet" ? "Sweet Breakfast Options" : "Savory Breakfast Options";
  const subheader = createSubheader(subheaderText);
  mealOptionsContainer.appendChild(subheader);

  // Create and append the menu items container
  const menuItemsDiv = document.createElement("div");
  menuItemsDiv.className = "meal-items";

  // Filter the menu data by type
  const filteredItems = dishes.filter((item) => item.type === type);
  console.log(`Found ${filteredItems.length} ${type} items:`, filteredItems);

  if (filteredItems.length === 0) {
    const noItemsMessage = document.createElement("p");
    noItemsMessage.textContent = `No ${type} breakfast options found.`;
    menuItemsDiv.appendChild(noItemsMessage);
  } else {
    // Create and append a button for each option
    filteredItems.forEach((item) => {
      const itemButton = createButton(item.name, `button button__${type}`);
      itemButton.addEventListener("click", () => {
        console.log(`Selected: ${item.name}`);
      });
      menuItemsDiv.appendChild(itemButton);
    });
  }

  // Append the menu items div to the meal options container
  mealOptionsContainer.appendChild(menuItemsDiv);
}

// Add the onclick event handler to the breakfast button - with error checking
if (breakfastButton) {
  breakfastButton.onclick = handleBreakfastClick;
  console.log("Click handler attached to breakfast button");
} else {
  console.error("Cannot attach click handler - breakfast button not found");
}

// Debug message to confirm script loaded
console.log("Breakfast menu script loaded successfully");
