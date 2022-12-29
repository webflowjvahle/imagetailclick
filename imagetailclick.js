let targetNode = document.querySelector(".c-main");

let config = { childList: true };

let callback = function (mutationsList) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      console.log("A child node has been added or removed.");
      if (document.querySelector("[data-imagetail]")) {
        console.log("navLinkImageTail element is present on the page");
        let navLinkImageTail = document.querySelector("[data-imagetail]");
        navLinkImageTail.addEventListener("click", function () {
          console.log("navLinkImageTail has been clicked");
          setTimeout(function () {
            let canvasTail = document.querySelector(".c-canvas-tail");
            const canvasParent = document.querySelector(".c-canvas-parent");
            console.log(canvasTail);
            // Custom Cursor
            const cursorTag = document.querySelector(".c-cursors");
            const ball = cursorTag.querySelector(".div");
            const ballMessage = cursorTag.querySelector(".c-cursor_text");
            const clickclickclick =
              document.querySelector(".c-imagetail_embed");
            console.log(clickclickclick);

            clickclickclick.addEventListener("mouseover", function () {
              ballMessage.classList.add("cc-visible");
            });
            clickclickclick.addEventListener("mouseout", function () {
              ballMessage.classList.remove("cc-visible");
            });

            // Load images from the imageUris array
            let images = [];
            let imageUris = [
              "https://assets.website-files.com/63a2d168efde7ef4089d65ad/63a2d168efde7e10719d65be_Placeholder_01.svg",
              "https://assets.website-files.com/63a2d168efde7ef4089d65ad/63a2d168efde7e2fcc9d65c3_Placeholder_02.svg",
              "https://assets.website-files.com/63a2d168efde7ef4089d65ad/63a2d168efde7ef7349d65bd_Placeholder_03.svg",
              "https://assets.website-files.com/63a2d168efde7ef4089d65ad/63a2d168efde7e62289d65c2_Placeholder_04.svg",
            ];
            function updateCanvasTailSize() {
              let canvasParentWidth = canvasParent.offsetWidth;
              let canvasParentHeight = canvasParent.offsetHeight;
              console.log(canvasTail);
              canvasTail.width = canvasParentWidth;
              canvasTail.height = canvasParentHeight;

              console.log(canvasTail.width);
              console.log(canvasTail.height);
            }

            updateCanvasTailSize(); // Update the element size when the page loads
            window.addEventListener("resize", updateCanvasTailSize); // Update the element size when the window is resized

            imageUris.forEach((iu) => {
              let img = new Image();
              img.onload = function () {
                images.push(img);
              };
              img.src = iu;
            });

            // Wait for the canvas element to be added to the DOM before accessing it
            // Get the canvas element
            let ctx = canvasTail.getContext("2d");

            // Set up mouse event listeners
            let mouseDown = false;
            let currentImage;
            canvasTail.addEventListener("mousedown", function (event) {
              currentImage = images[getRandomInt(images.length)];
              mouseDown = true;
              let rect = canvasTail.getBoundingClientRect();
              let x = event.clientX - (rect.left + currentImage.width / 2);
              let y = event.clientY - (rect.top + currentImage.height / 2);
              drawImage(x, y);
            });
            canvasTail.addEventListener("mouseup", function (event) {
              mouseDown = false;
            });
            canvasTail.addEventListener("mouseout", function (event) {
              mouseDown = false;
            });
            canvasTail.addEventListener("mousemove", function (event) {
              if (!mouseDown) {
                return;
              }
              let rect = canvasTail.getBoundingClientRect();
              let x = event.clientX - (rect.left + currentImage.width / 2);
              let y = event.clientY - (rect.top + currentImage.height / 2);
              drawImage(x, y);
            });

            // Draws an image on the canvas at the given x, y cords
            function drawImage(x, y) {
              ctx.drawImage(currentImage, x, y);
            }
            // Returns a random number between 0 and max
            function getRandomInt(max) {
              return Math.floor(Math.random() * max);
            }
          }, 400);
        });
      } else {
        console.log("navLinkImageTail element is not present on the page");
      }
    }
  }
};

let observer = new MutationObserver(callback);
observer.observe(targetNode, config);
