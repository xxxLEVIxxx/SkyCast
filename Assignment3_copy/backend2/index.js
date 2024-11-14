// server.js
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3030;

// Serve the static files from the dist directory
app.use(express.static(path.join(__dirname, "dist/assignment3-copy/browser/")));

// All routes will be handled by index.html
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "dist/assignment3-copy/browser/index.html")
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
