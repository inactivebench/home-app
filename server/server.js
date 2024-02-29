const express = require("express");

const app = express();

// api route
app.get("/api", (req, res) => {
  res.send({ message: "Hello from server" });
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
