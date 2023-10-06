// Get references to the buttons
const cropButton = document.getElementById('crop');
const flowerButton = document.getElementById('flower');

// Variable to keep track of the currently selected button
let selectedButton = null;

// Function to handle button click
function handleButtonClick(event) {
    // Remove the "selected" class from the previously selected button (if any)
    if (selectedButton) {
        selectedButton.classList.remove('selected');
    }

    // Add the "selected" class to the clicked button
    event.currentTarget.classList.add('selected');

    // Update the selectedButton variable
    selectedButton = event.currentTarget;
}

// Add click event listeners to the buttons
cropButton.addEventListener('click', handleButtonClick);
flowerButton.addEventListener('click', handleButtonClick);

export {selectedButton};