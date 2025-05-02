// Add event listener to the "Pick Again" button
document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.querySelector(".button__back");
    if (backButton) {
        backButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link behavior like refreshing the page
            history.back(); // Navigate to the previous page
        });
    }
});
