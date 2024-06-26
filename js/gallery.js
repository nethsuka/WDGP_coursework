// Define a data structure to store main images and their related images
var imageRelations = {
  "img/diversity.jpeg": [
    "img/corals.jpeg",
    "img/seaweeds.jpeg",
    "img/largest-fish.jpeg",
  ],
  "img/pollution.jpeg": [
    "img/trash.jpg",
    "img/turtle.jpeg",
    "img/plastics-waste.jpeg",
  ],
  "img/fishery.png": [
    "img/fishload.avif",
    "img/fishing.jpeg",
    "img/fishing-net-river.jpeg",
  ],
  "img/whale_watching.jpeg": [
    "img/beaches.jpeg",
    "img/tourfish.jpeg",
    "img/diving.jpeg",
  ],
};

// Open the Modal view
function openModalView(ele) {
  let captionText = ele.getAttribute("caption");
  let imgSrc = ele.getAttribute("src");
  let headingText = ele.getAttribute("heading");
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
    headingElem = document.createElement("div");
    headingElem.id = "heading";
    headingElem.innerHTML = headingText;
    modal.appendChild(headingElem);
  }

  // Add animation class to the caption
  captionTextElem.classList.add("caption-animation");

  // Clear previous related images
  if(document.getElementById("related_img")){
    document.getElementById("related_img")=""
  }
  let relatedImagesContainer = document.createElement("div");
  relatedImagesContainer.id = "related_img"
  relatedImagesContainer.classList.add("related-images");

  // Get related images for the current main image
  let relatedImages = imageRelations[imgSrc];
  relatedImages.forEach((i) => {
    let relatedImage = document.createElement("img");
    relatedImage.src = i
    relatedImagesContainer.appendChild(relatedImage);
    relatedImage.onclick = () => {
        openModalView(relatedImage)
    };
  });

  modal.appendChild(relatedImagesContainer);
}

// Close the Modal view
function closeModalView() {
  let modal = document.getElementById("myModal");
  modal.style.display = "none";

  // Remove related images when modal is closed
  let relatedImagesContainer = document.querySelector(".related-images");
  if (relatedImagesContainer) {
    relatedImagesContainer.remove();
  }
}
