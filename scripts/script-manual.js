// ======= DOM SELECTORS & GLOBALS =======
const breakfastButton = document.querySelector(".button.button__bkfast");
const regularMenuButton = document.querySelector(".button.button__regular");
const insertingDiv = document.querySelector(".inserting-div");
let mealOptionsContainer;
let dishes = [];

// ======= CONSTANTS =======
// The order of presented sections
const MAIN_DISH_SUBCATS_ORDER = [
  "noodle-soup",
  "rice",
  "dough",
  "grilled",
  "deep-fried",
  "handheld",
];

// ======= UTILITY FUNCTIONS =======
// Function to create customizable button components by class that can be appended to the DOM
function createButton(text, className) {
  const btn = document.createElement("input");
  btn.type = "button";
  btn.value = text;
  btn.className = className;
  return btn;
}

// Function to create customizable subheading components that can be appended to the DOM
function createSubheader(text) {
  const subheader = document.createElement("h2");
  subheader.className = "subheading";
  subheader.textContent = text;
  return subheader;
}

// Parses through subcategories to remove little hyphens and formats them into text for button naming.
function formatSubcategory(subcat) {
  return subcat
    ? subcat
        .replace(/[-_]/g, " ")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "";
}

function showDishButtons(items) {
  const menuItemsDiv = document.createElement("div");
  menuItemsDiv.className = "meal-items";
  if (!items.length) {
    const msg = document.createElement("p");
    msg.textContent = "No dishes found.";
    menuItemsDiv.appendChild(msg);
    return menuItemsDiv;
  }
  items.forEach((item) => {
    const btn = createButton(item.name, `button button__${item.subCategory}`);
    btn.addEventListener("click", () => {
      window.location.href = `./dish-details.html?id=${encodeURIComponent(
        item.id
      )}`;
    });
    menuItemsDiv.appendChild(btn);
  });
  return menuItemsDiv;
}

// ======= BREAKFAST SECTION =======
function handleBreakfastClick() {
  if (!insertingDiv) return console.error("insertingDiv not found");
  insertingDiv.innerHTML = "";
  mealOptionsContainer = document.createElement("div");
  mealOptionsContainer.className = "meal-options";
  insertingDiv.appendChild(mealOptionsContainer);

  mealOptionsContainer.appendChild(createSubheader("Choose a type"));

  const mealTypeDiv = document.createElement("div");
  mealTypeDiv.className = "meal-types";
  ["sweet", "savory"].forEach((type) => {
    const btn = createButton(formatSubcategory(type), `button button__${type}`);
    btn.addEventListener("click", () => showBreakfastOptions(type));
    mealTypeDiv.appendChild(btn);
  });
  mealOptionsContainer.appendChild(mealTypeDiv);
}

// Displays breakfast options filtered by their sweet/savory subcategory
function showBreakfastOptions(type) {
  if (!mealOptionsContainer) return;
  mealOptionsContainer.innerHTML = "";
  mealOptionsContainer.appendChild(
    createSubheader(`${formatSubcategory(type)} Breakfast Options`)
  );
  const filtered = dishes.filter(
    (d) => d.category === "breakfast" && d.subCategory === type
  );
  mealOptionsContainer.appendChild(showDishButtons(filtered));
}

// ======= REGULAR MENU SECTION =======
function handleRegularMenuClick() {
  if (!insertingDiv) return console.error("insertingDiv not found");
  insertingDiv.innerHTML = "";
  mealOptionsContainer = document.createElement("div");
  mealOptionsContainer.className = "meal-options";
  insertingDiv.appendChild(mealOptionsContainer);

  mealOptionsContainer.appendChild(createSubheader("Choose a type"));

  // Get unique main-dish subcategories present in data, sorted by preferred order
  const availableSubcats = [
    ...new Set(
      dishes.filter((d) => d.category === "main-dish").map((d) => d.subCategory)
    ),
  ];
  const sortedSubcats = MAIN_DISH_SUBCATS_ORDER.filter((sc) =>
    availableSubcats.includes(sc)
  );

  const subcatDiv = document.createElement("div");
  subcatDiv.className = "meal-types";
  sortedSubcats.forEach((subcat) => {
    const btn = createButton(
      formatSubcategory(subcat),
      `button button__${subcat}`
    );
    btn.addEventListener("click", () => showMainDishOptions(subcat));
    subcatDiv.appendChild(btn);
  });
  mealOptionsContainer.appendChild(subcatDiv);
}

// Displays main dish options filtered by their clicked subcategory
function showMainDishOptions(subcat) {
  if (!mealOptionsContainer) return;
  mealOptionsContainer.innerHTML = "";
  mealOptionsContainer.appendChild(
    createSubheader(`${formatSubcategory(subcat)} Dishes`)
  );
  const filtered = dishes.filter(
    (d) => d.category === "main-dish" && d.subCategory === subcat
  );
  mealOptionsContainer.appendChild(showDishButtons(filtered));
}

// ======= DATA FETCH & EVENT BINDINGS =======
fetch("/data/dishes.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load dishes.json");
    return res.json();
  })
  .then((data) => {
    dishes = data;
    console.log("Dishes loaded successfully:", data);
  })
  .catch((err) => console.error("Error loading dishes:", err));

// Calls respect breakfast and regular menu button functions when clicked
if (breakfastButton) {
  breakfastButton.onclick = handleBreakfastClick;
}
if (regularMenuButton) {
  regularMenuButton.onclick = handleRegularMenuClick;
}
