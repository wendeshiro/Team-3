// Get DOM elements
const blindBoxes = document.querySelectorAll(".blind-box");
const revealOverlay = document.getElementById("revealOverlay");
const closeOverlayBtn = document.getElementById("closeOverlay");
const dishImage = document.getElementById("dishImage");
const dishName = document.getElementById("dishName");
const moreInfoBtn = document.getElementById("moreInfoBtn");

let dishes = [];
let selectedDish = null;

fetch("/data/dishes.json")
    .then((res) => {
        if (!res.ok) throw new Error("Failed to load dishes.json");
        return res.json();
    })
    .then((data) => {
        dishes = data;
        bindBlindBoxEvents();
    })
    .catch((err) => {
        console.error("Error", err);
    });

// Add click event to blind boxes
function bindBlindBoxEvents() {
    blindBoxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            // Get a random dish or use the index to match
            selectedDish = dishes[index % dishes.length];

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
        // Navigate to details page with dish ID
        window.location.href = `dish-details.html?id=${selectedDish.id}`;
    }
});
