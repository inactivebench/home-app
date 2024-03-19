const express = require("express");
const mysql = require("mysql2");
const db = require("./config/db");
const session = require("./config/session");
const propertyData = require("./routes/scrapeData");
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// cookieParser middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

//routes
// users middleware
app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/property", require("./routes/propertyRoutes"));
const firstUrl =
  "https://www.privatepropertykenya.com/apartment-for-rent?search=Nairobi&bedroom=&min_price=&max_price=&button=&page=11";

// propertyData(firstUrl);
// test

app.get("/api", (req, res) => {
  console.log("Received /api request...");
  res.send({ message: "Hello from server" });
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
