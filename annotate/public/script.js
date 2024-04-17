document.addEventListener("DOMContentLoaded", function () {
  const annotateButton = document.getElementById("annotate-button");
  const clearButton = document.getElementById("clear-button");
  const annotationText = document.getElementById("annotation-text");
  const canvas = document.getElementById("drawing-canvas");
  const ctx = canvas.getContext("2d");
  const strokeWidthSlider = document.getElementById("stroke-width-slider");
  const websiteContent = document.getElementById("website-content");

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let annotations = []; // Array to store annotation elements
  let currentColor = "#007bff"; // Default stroke color
  let strokeWidth = parseInt(strokeWidthSlider.value); // Initial stroke width

  // Function to get mouse coordinates relative to the canvas
  function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }

  // Function to start drawing
  function startDrawing(e) {
    isDrawing = true;
    const pos = getMousePos(canvas, e);
    [lastX, lastY] = [pos.x, pos.y];
  }

  // Function to draw
  function draw(e) {
    if (!isDrawing) return;

    const pos = getMousePos(canvas, e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = currentColor; // Set drawing color
    ctx.lineWidth = strokeWidth; // Set line width
    ctx.lineCap = "round"; // Set line cap style
    ctx.stroke();

    [lastX, lastY] = [pos.x, pos.y];
  }

  function endDrawing() {
    isDrawing = false;
  }

  // Function to resize canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Set initial canvas size
  resizeCanvas();

  // Event listeners for drawing
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", endDrawing);
  canvas.addEventListener("mouseout", endDrawing);

  // Function to handle color selection
  function selectColor(color) {
    currentColor = color;
  }

  // Event listeners for color buttons
  document.getElementById("color-blue").addEventListener("click", function () {
    selectColor("#007bff"); // Blue
  });

  document.getElementById("color-brown").addEventListener("click", function () {
    selectColor("#4e0909ff"); // Brown
  });

  document.getElementById("color-green").addEventListener("click", function () {
    selectColor("#056d05"); // Green
  });

  document.getElementById("color-black").addEventListener("click", function () {
    selectColor("black"); // black
  });

  // Event listener for stroke width slider
  strokeWidthSlider.addEventListener("input", function () {
    strokeWidth = parseInt(this.value);
  });

  // Event listener for annotating
  annotateButton.addEventListener("click", function () {
    const annotation = annotationText.value.trim();
    if (annotation !== "") {
      // Create annotation element
      const annotationElement = document.createElement("div");
      annotationElement.classList.add("annotation");
      annotationElement.innerText = annotation;
      annotationElement.style.position = "absolute";
      annotationElement.style.left = `${lastX}px`;
      annotationElement.style.top = `${lastY}px`;
      annotationElement.style.color = currentColor; // Set annotation color

      // Append annotation to website content
      document.getElementById("website-content").appendChild(annotationElement);

      // Store annotation element
      annotations.push(annotationElement);

      // Clear annotation text area
      annotationText.value = "";
    } else {
      alert("Please enter your annotation!");
    }
  });

  // Event listener for clearing canvas
  clearButton.addEventListener("click", function () {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Remove annotation elements from the DOM
    annotations.forEach((annotation) => annotation.remove());

    // Clear the annotations array
    annotations = [];

    drawImage("map1.svg");
  });

  // Resize canvas when window is resized
  window.addEventListener("resize", resizeCanvas);
});

let canvas = document.getElementById("drawing-canvas");
let ctx = canvas.getContext("2d");

// Function to draw image
const drawImage = (filename) => {
  const image = new Image();
  image.src = filename;
  image.onload = () => {
    // Increase the size of the image
    const scaleFactor = 1; // Adjust this value as needed
    const newWidth = image.width * scaleFactor;
    const newHeight = image.height * scaleFactor;
    ctx.drawImage(image, 475, 0, newWidth, newHeight);
  };
};

drawImage("map1.svg");

// Add more buttons and event listeners for other images as needed

// const image = new Image();
// image.onload = function () {
//   console.log("Image loaded successfully");
//   ctx.drawImage(image, 500, 200, 140, 60);
// };
// image.onerror = function () {
//   console.error("Error loading image");
// };
// image.src = "vector 2.svg";

function saveCanvasAsBase64AndSendToServer() {
  // Get the data URL of the canvas content
  const dataURL = canvas.toDataURL("image/png");

  // Send the base64 encoded string to the server
  fetch("/save-base64", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ base64Data: dataURL }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Canvas data saved successfully");
      } else {
        console.error("Failed to save canvas data");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Add event listener to the save button for saving as base64 and sending to server
document
  .getElementById("save-base64-button")
  .addEventListener("click", saveCanvasAsBase64AndSendToServer);

document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch the messages from the server and display them
  function fetchAndDisplayMessages() {
    fetch("/get-messages")
      .then((response) => response.json())
      .then((data) => {
        const messages = data.messages || []; // Retrieve the array of messages
        const messageList = document.getElementById("messageList");

        // Clear the existing list
        messageList.innerHTML = "";

        // Append each message as a list item to the ordered list
        messages.forEach((message, index) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${message}`;
          messageList.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Fetch and display the messages when the page loads
  fetchAndDisplayMessages();

  // Optionally, fetch and display the messages periodically (e.g., every 5 seconds)
  setInterval(fetchAndDisplayMessages, 2000);
});
