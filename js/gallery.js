
        // Define a data structure to store main images and their related images
var imageRelations = {
    "img/diversity.jpeg": ["img/corals.jpeg", "img/seaweeds.jpeg", "img/largest-fish.jpeg"],
    "img/pollution.jpeg": ["img/trash.jpg", "img/turtle.jpeg", "img/plastics-waste.jpeg"],
    "img/fishery.png": ["img/fishload.avif", "img/fishing.jpeg", "img/fishing-net-river.jpeg"],
    "img/whale_watching.jpeg": ["img/beaches.jpeg", "img/tourfish.jpeg", "img/diving.jpeg"]
};

// Open the Modal
function openModalView(imgSrc, captionText, headingText) {
    let modal = document.getElementById("myModal");
    let headingElem = document.getElementById("heading");
    let modalImg = document.getElementById("modalImg");
    let captionTextElem = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = imgSrc;
    captionTextElem.innerHTML = captionText;
    
    // Set the heading text or create a new heading if it doesn't exist
    if (headingElem) {
        headingElem.innerHTML = headingText;
    } else {
        headingElem = document.createElement('div');
        headingElem.id = "heading";
        headingElem.innerHTML = headingText;
        modal.appendChild(headingElem);
    }

    // Add animation class to the caption
    captionTextElem.classList.add("caption-animation");

    // Clear previous related images
    let relatedImagesContainer = document.createElement('div');
    relatedImagesContainer.classList.add('related-images');

    // Get related images for the current main image
    let relatedImages = imageRelations[imgSrc];
    if (relatedImages) {
        relatedImages.forEach(function(relatedImgSrc) {
            let relatedImage = document.createElement('img');
            relatedImage.src = relatedImgSrc;
            relatedImage.alt = "Related Image";
            relatedImagesContainer.appendChild(relatedImage);
        });
    }

    modal.appendChild(relatedImagesContainer);
}


// Close the Modal
function closeModalView() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
    
    // Remove related images when modal is closed
    let relatedImagesContainer = document.querySelector('.related-images');
    if (relatedImagesContainer) {
        relatedImagesContainer.remove();
    }
}

let imageElement = document.getElementsByClassName('hoverImage');

// Add event listener for mouseover event
imageElement.addEventListener('mouseover', function() {
    // Your code for what happens when the mouse hovers over the image
    // For example, changing the border color
    imageElement.style.border = '2px solid blue';
});

// Add event listener for mouseout event
imageElement.addEventListener('mouseout', function() {
    // Your code for what happens when the mouse moves out of the image
    // For example, reverting the border color to its original state
    imageElement.style.border = 'none';
});