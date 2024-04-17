const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const fs = require("fs");

// Define message variable to store the message
let message = "";
let messages = []; // Array to store messages

// Route to handle POST requests from student's side to save canvas data as base64
app.post("/save-base64", (req, res) => {
  // Access base64 encoded canvas data from request body
  const base64Data = req.body.base64Data;

  // Remove header from base64 data (optional)
  const base64DataWithoutHeader = base64Data.replace(
    /^data:image\/\w+;base64,/,
    ""
  );

  // Decode base64 data
  const buffer = Buffer.from(base64DataWithoutHeader, "base64");

  // Generate a unique filename or use a predefined filename
  const filename = "canvasData.png"; // Example filename

  // Write base64 data to a file
  fs.writeFile(filename, buffer, (err) => {
    if (err) {
      console.error("Error saving base64 data:", err);
      res.status(500).send("Error saving base64 data");
    } else {
      console.log("Base64 encoded canvas data saved to:", filename);
      res.send("Base64 encoded canvas data saved successfully");
    }
  });
});

// Route to serve the saved canvas image to the teacher's frontend
app.get("/canvas-image", (req, res) => {
  // Send the image file as the response
  res.sendFile(path.join(__dirname, "canvasData.png"));
});
app.get("/self-test", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "selftest.html"));
});

app.get("/explore-rivers", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "display.html"));
});

app.get("/send-message", (req, res) => {
  // Retrieve the message from the query parameter
  const message = req.query.message || "";
  console.log("Received message:", message);

  // Store the message in the array
  messages.push(message);

  // Send a response indicating success
  res.send("Message sent successfully!");
});

// Handle message submission from sender
app.post("/send-message", (req, res) => {
  // Retrieve the message from the request body
  const message = req.body.message || "";
  // Send a response indicating success
  console.log("Received message:", message);
  res.send("Message received successfully!");
});

app.get("/teacher-dash", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "teacherdash.html"));
});

// Serve the receiver page along with the message
app.get("/receiver", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/get-messages", (req, res) => {
  // Send the array of messages as JSON object
  res.json({ messages: messages });
});

// Route to handle message deletion
app.delete("/delete-message", (req, res) => {
  const index = parseInt(req.query.index);
  if (!isNaN(index) && index >= 0 && index < messages.length) {
    messages.splice(index, 1); // Remove the message at the specified index
    res.send("Message deleted successfully!");
  } else {
    res.status(400).send("Invalid index");
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
