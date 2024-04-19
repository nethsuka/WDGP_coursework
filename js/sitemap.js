// Get the color picker ele
const colorPicker = document.getElementById('colorPicker');
        
// Get the rect
const rectangles = document.querySelectorAll('rect');

// Function to set the selected color in local storage
function setSelectedColor(color) {
    sessionStorage.setItem('selectedColor', color);
}

// Function to get the selected color from local storage
function getSelectedColor() {
// Check if there's a selected color in local storage
// If not, return the default color
    return sessionStorage.getItem('selectedColor') || 'dodgerblue';
}

// Function to update the fill color of rectangles
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

    // Set the color picker value
    colorPicker.value = selectedColor;

    // Update the fill color of rectangles
    updateRectanglesColor(selectedColor);
}

// Initialize color picker and rectangles on loading
initializeColorPickerAndRectangles();