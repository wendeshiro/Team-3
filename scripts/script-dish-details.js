// Fetch the dish details from the JSON file and update the page content
document.addEventListener("DOMContentLoaded", () => {
    // Add event listener to the "Pick Again" button
    const backButton = document.querySelector(".button__back");
    if (backButton) {
        backButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link behavior like refreshing the page
            history.back(); // Navigate to the previous page
        });
    }

    // Get the dish ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const dishId = urlParams.get("id");

    if (!dishId) {
        console.error("No dish ID provided in the URL.");
        return;
    }

    // Fetch the dishes data
    fetch("./data/dishes.json")
        .then((res) => {
            if (!res.ok) throw new Error("Failed to load dishes.json");
            return res.json();
        })
        .then((dishes) => {
            // Find the dish with the matching ID
            const dish = dishes.find((d) => d.id === dishId);
            if (!dish) {
                console.error("Dish not found.");
                return;
            }

            // Update the page content
            document.getElementById("dishImage").src = dish.image;
            document.getElementById("dishName").textContent = dish.name;
            document.getElementById("dishDescription").textContent = dish.desc;

            // Update action buttons
            document.getElementById(
                "restaurantLink"
            ).href = `https://www.google.ca/maps/search/${encodeURIComponent(dish.name)}`;
            document.getElementById(
                "recipeLink"
            ).href = `https://www.google.ca/search?q=${encodeURIComponent(dish.name)}+recipe`;
        })
        .catch((err) => {
            console.error("Error loading dish details:", err);
        });
});
