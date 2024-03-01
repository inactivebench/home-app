const express = require("express");

const app = express();

// api route

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.get("/api", (req, res) => {
  console.log("Received /api request...");
  res.send({ message: "Hello from server" });
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
