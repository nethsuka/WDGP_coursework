
        // Define a data structure to store main images and their related images
        var imageRelations = {
            "img/diversity.jpeg": ["img/diversity.jpeg", "img/fishery.png", "img/whale_watching.jpeg"],
            "img/pollution.jpeg": ["img/pollution.jpeg", "img/fishery.png", "img/whale_watching.jpeg"],
            "img/fishery.png": ["img/pollution.jpeg", "img/fishery.png", "img/whale_watching.jpeg"],
            "img/whale_watching.jpeg": ["img/pollution.jpeg", "img/fishery.png", "img/whale_watching.jpeg"]
        };
        
        // Open the Modal
        function openModal(imgSrc, captionText) {
            var modal = document.getElementById("myModal");
            var modalImg = document.getElementById("modalImg");
            var captionTextElem = document.getElementById("caption");
        
            modal.style.display = "block";
            modalImg.src = imgSrc;
            captionTextElem.innerHTML = captionText;
        
            // Clear previous related images
            var relatedImagesContainer = document.createElement('div');
            relatedImagesContainer.classList.add('related-images');
        
            // Get related images for the current main image
            var relatedImages = imageRelations[imgSrc];
            if (relatedImages) {
                relatedImages.forEach(function(relatedImgSrc) {
                    var relatedImage = document.createElement('img');
                    relatedImage.src = relatedImgSrc;
                    relatedImage.alt = "Related Image";
                    relatedImagesContainer.appendChild(relatedImage);
                });
            }
        
            modal.appendChild(relatedImagesContainer);
        
            // Scroll buttons
            var scrollLeftButton = document.createElement('button');
            scrollLeftButton.textContent = '<<';
            scrollLeftButton.classList.add('scroll-button');
            scrollLeftButton.addEventListener('click', function() {
                relatedImagesContainer.scrollBy({
                    left: -150, // Adjust as per your requirement
                    behavior: 'smooth'
                });
            });
            modal.appendChild(scrollLeftButton);
        
            var scrollRightButton = document.createElement('button');
            scrollRightButton.textContent = '>>';
            scrollRightButton.classList.add('scroll-button');
            scrollRightButton.addEventListener('click', function() {
                relatedImagesContainer.scrollBy({
                    left: 150, // Adjust as per your requirement
                    behavior: 'smooth'
                });
            });
            modal.appendChild(scrollRightButton);
        }
        
        // Close the Modal
        function closeModal() {
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
        
            // Remove related images when modal is closed
            var relatedImagesContainer = document.querySelector('.related-images');
            if (relatedImagesContainer) {
                relatedImagesContainer.remove();
            }
        }
        
            var imageElement = document.getElementsByClassName('hoverImage');
        
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
        
        