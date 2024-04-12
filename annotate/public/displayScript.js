var paths = [
  {
    path: "M5 17L8 16.5L10.5 15L12 14L14 15L17 16H19L21.5 15L23.5 14.5H25.5H27L29.5 14L31 13.5H33H35H36.5H38.5H41L42.5 12.5L45 11H47.5L49.5 12.5L52.5 11.5L54 10L56 9.5L57.5 8L59.5 7.5L62 6L64.5 5H66.5L68.5 4L71.5 2.5L74.5 2L76.5 2.5H79L81 2L82.5 1H87L88 2L88.5 3.5V5L90.5 6L92 6.5L93.5 8.5L94.5 10V12.5L97 14.5L98 16L99 17.5",
    stroke: "#2290CB",
    strokeWidth: "1.6",
    fill: "none",
    transform: "translate(138,305) scale(1.4)",
  },
  {
    path: "M0 5H4L8 6.5L13.5 2.5L18 3.5L21.5 5L26 8L32 9H35L39.5 6.5L43 5L46.5 3.5L50 2.5L54.5 1H58.5L60.5 2.5",
    stroke: "#2290CB",
    strokeWidth: "1.6",
    fill: "none",
    transform: "translate(146,335) scale(1.4)",
  },
  {
    path: "M1 1L5.5 6.5L7.5 8.5L11 10L13.5 12H17L21 16.5H25L29 17L31 19.5L34.5 21L36.5 22L40.5 21L43.5 20.5L46 22L47 24.5H50L52.5 23.5H56L58 22H60.5L62 23L62.5 24L65 24.5L66.5 25.5L67.5 27L69 27.5L71 27L72.5 25.5L74 26.5L76.5 27.5L78.5 28.5L79 31L80.5 33.5L83.5 36L85 38.5L85.5 41L87 42H89L91.5 43.5L94.5 45L95 47V50.5L96 53L98.5 57",
    stroke: "#2290CB",
    strokeWidth: "1.6",
    fill: "none",
    transform: "translate(167,351) scale(1.3)",
  },
  {
    path: "M1 1L3 2.5L5.5 5.5V9.5L6.5 12.5L9 15L11 18L12.5 21.5H16L19.5 22.5L24 24.5L26.5 25.5L29.5 28H32.5L36 25.5L39 24.5H41.5L45 25.5L47 26.5L50 28L53 30L54.5 32L56 31L57.5 30.5H59.5H61.5H63L64.5 30L65.5 29L67.5 27.5L68.5 25.5L70.5 24.5L72.5 23.5L75.5 23L78 22H79L81.5 23.5L82.5 24.5L84 25.5L85 26.5L86 27L87 27.5L87.5 29V33.5",
    stroke: "#2290CB",
    strokeWidth: "1.6",
    fill: "none",
    transform: "translate(165,390) scale(1.3)",
  },
  {
    path: "M1 1L4 5H9L11.5 8.5V10.5L13 12.5H14.5L16.5 14L17.5 15.5L18.5 16.5L20 15.5L21.5 15L23 14.5L24.5 15L26.5 15.5L27.5 16.5L28.5 18.5L28 19.5V22.5V25V27L28.5 28.5L29.5 30.5L30.5 32L32.5 33L34 34L35.5 34.5L37 35.5L38.5 36H40L41.5 36.5L43.5 36L45 35.5L46.5 34.5L48 33.5L49.5 32L50.5 30.5L52 28.5L52.5 28L53.5 27L56 27.5",
    stroke: "#2290CB",
    strokeWidth: "1.6",
    fill: "none",
    transform: "translate(188,475) scale(1.4)",
  },
  // Add more path objects as needed
];

// Function to display the SVG path
function displayPath(pathObj, index) {
  var svgContainer = document.getElementById("svgContainer");
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  path.setAttribute("d", pathObj.path);
  path.setAttribute("stroke", pathObj.stroke);
  path.setAttribute("stroke-width", pathObj.strokeWidth);
  path.setAttribute("fill", pathObj.fill);
  path.setAttribute("transform", pathObj.transform);
  path.setAttribute("id", "path_" + index); // Set id for the path
  path.setAttribute("class", "path-animation");

  svgContainer.appendChild(path);
}

function showPath(index) {
  displayPath(paths[index], index);
  document.getElementById("hidePathButton" + index).style.display = "inline"; // Show Hide Path button
}

// Function to hide a path
function hidePath(index) {
  var svgContainer = document.getElementById("svgContainer");
  var path = document.getElementById("path_" + index);
  svgContainer.removeChild(path);
  document.getElementById("hidePathButton" + index).style.display = "none"; // Hide Hide Path button
}

function displayall() {
  for (let i = 0; i < paths.length; i++) {
    displayPath(paths[i], i);
    document.getElementById("hidePathButton" + i).style.display = "inline";
  }
}

function hideAllPaths() {
  var svgContainer = document.getElementById("svgContainer");
  for (var i = 0; i < paths.length; i++) {
    var path = document.getElementById("path_" + i);
    if (path) {
      svgContainer.removeChild(path);
      document.getElementById("hidePathButton" + i).style.display = "none"; // Hide Hide Path button
    }
  }
}

function toggleImage() {
  var img = document.getElementById("states");
  var button = document.getElementById("toggleButton");
  if (img.style.display === "none") {
    img.style.display = "block";
    button.textContent = "Hide States Map";
  } else {
    img.style.display = "none";
    button.textContent = "Show States Map";
  }
}
