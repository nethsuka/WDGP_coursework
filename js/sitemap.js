// Get the color picker element
const colorPicker = document.getElementById('colorPicker');
        
// Get all the rectangles
const rectangles = document.querySelectorAll('rect');

// Function to set the selected color in local storage
function setSelectedColor(color) {
    localStorage.setItem('selectedColor', color);
}

// Function to get the selected color from local storage
function getSelectedColor() {
    // Check if there's a selected color in local storage
    // If not, return the default color
    return localStorage.getItem('selectedColor') || 'dodgerblue';
}

// Function to update the fill color of rectangles with the selected color
function updateRectanglesColor(color) {
    rectangles.forEach(function(rectangle) {
        rectangle.setAttribute('fill', color);
    });
}

// Add event listener for color change
colorPicker.addEventListener('input', function() {
    // Get the selected color
    const selectedColor = colorPicker.value;

    // Set the selected color in local storage
    setSelectedColor(selectedColor);

    // Update the fill color of rectangles
    updateRectanglesColor(selectedColor);
});

// Function to initialize the color picker and rectangles with the selected color from local storage
function initializeColorPickerAndRectangles() {
    const selectedColor = getSelectedColor();

    // Set the color picker value to the selected color
    colorPicker.value = selectedColor;

    // Update the fill color of rectangles with the selected color
    updateRectanglesColor(selectedColor);
}

// Initialize color picker and rectangles on page load
initializeColorPickerAndRectangles();