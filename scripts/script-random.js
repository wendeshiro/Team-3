// Get DOM elements
const blindBoxes = document.querySelectorAll(".blind-box");
const revealOverlay = document.getElementById("revealOverlay");
const closeOverlayBtn = document.getElementById("closeOverlay");
const dishImage = document.getElementById("dishImage");
const dishName = document.getElementById("dishName");
const moreInfoBtn = document.getElementById("moreInfoBtn");

let dishes = [];
let selectedDish = null;

// Get the category from the URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category") || "all"; // Default to "all"

fetch("./data/dishes.json")
    .then((res) => {
        if (!res.ok) throw new Error("Failed to load dishes.json");
        return res.json();
    })
    .then((data) => {
        // Filter dishes based on the category
        dishes = category === "all" ? data : data.filter((dish) => dish.category === category);
        bindBlindBoxEvents();
    })
    .catch((err) => {
        console.error("Error", err);
    });

// Add click event to blind boxes
function bindBlindBoxEvents() {
    blindBoxes.forEach((box) => {
        box.addEventListener("click", () => {
            // Get a random dish
            const randomIndex = Math.floor(Math.random() * dishes.length);
            selectedDish = dishes[randomIndex];

            // Set the dish info
            dishImage.src = selectedDish.image;
            dishName.textContent = selectedDish.name;

            // Show the overlay
            revealOverlay.classList.add("active");
        });
    });
}

// Close overlay button
closeOverlayBtn.addEventListener("click", () => {
    revealOverlay.classList.remove("active");

    // Reset after animation
    setTimeout(() => {
        selectedDish = null;
        dishImage.src = "";
        dishName.textContent = "";
    }, 500);
});

// More info button
moreInfoBtn.addEventListener("click", () => {
    if (selectedDish) {
        // Navigate to the details page with the dish ID as a query parameter
        window.location.href = `./dish-details.html?id=${selectedDish.id}`;
    }
});

// Back to previous page for "Change Category" button
const backButton = document.querySelector(".button__back");
if (backButton) {
    backButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link behavior like refreshing the page
        history.back(); // Navigate to the previous page
    });
}
