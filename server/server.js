const express = require("express");
const mysql = require("mysql2");
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");

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

// create db connection
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

//connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected");
});

// api route
// signup
app.post("/signup", (req, res) => {
  let user = {
    customer_fname: req.body.customer_fname,
    customer_lname: req.body.customer_lname,
    customer_email: req.body.customer_email,
    password: req.body.password,
    phone_number: req.body.phone_number,
  };
  let sql = " INSERT INTO customers SET ? ";
  let query = db.query(sql, user, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("user created ");
    res.send(result);
  });
});

//JWT verification
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("We need a token, please give it to us next time");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({ auth: false, message: "you are failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

// sign in authorization
app.post("/signin", (req, res) => {
  const customer_email = req.body.customer_email;
  const password = req.body.password;
  let sql =
    " SELECT * FROM customers WHERE customer_email = ? AND password = ?  ";
  let query = db.query(sql, [customer_email, password], (err, result) => {
    if (err) {
      throw err;
    }

    if (result.length > 0) {
      const id = result[0].id;
      const token = jwt.sign({ id }, "jwtSecret", { expiresIn: 300 });
      req.session.user = result;
      console.log(req.session.user);
      res.json({ auth: true, token: token, result: result });
      // res.send(result)
      console.log("SUCCESS !! ");
    } else {
      console.log("wrong email/password ");
      res.json({ auth: false, message: "no user exists" });
    }
  });
});

// sign in session
app.get("/signin", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

// check user authentication
app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("You are authenticated Congrats:");
});

// select users
app.get("/getusers", (req, res) => {
  let sql = " SELECT * FROM customers ";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send(result);
  });
});

// web scraping with cheerio
const firstUrl =
  "https://www.privatepropertykenya.com/apartment-for-rent?search=Nairobi&bedroom=&min_price=&max_price=&button=&page=10";
//link to each property listing
async function rentalPropertyLinks(url) {
  await axios
    .get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const propertyLinks = [];
      $(".similar-listings-item", html).each(function () {
        const listingUrl = $(this)
          .find(".similar-listings-info > h3 > a")
          .attr("href");

        propertyLinks.push({
          listingUrl,
        });
      });
      // console.log(propertyLinks);
      console.log(propertyLinks.length);

      // extract data from each property link
      propertyLinks.forEach((propertyLink) => {
        let propertyUrl = `https://www.privatepropertykenya.com${propertyLink.listingUrl}`;

        const scrapePropertyData = () => {
          axios
            .get(propertyUrl)
            .then((response) => {
              const html = response.data;
              const $ = cheerio.load(html);
              const listing = [];
              const title = $("div.property-info").find(" h1").text();
              const price = $("p.price").find("strong:last").text();
              const location = $("div.property-info").find("p:first").text();
              const description = $("div.description-list").text();
              const bed = $("ul.property-benefit").find("li:first").text();
              const bath = $("ul.property-benefit").find("li:nth(2)").text();

              // const imgUrl = $(this).find("img").attr("src");
              listing.push({
                title,
                // imgUrl,
                price,
                location,
                description,
                bed,
                bath,
              });
              console.log(listing);
              console.log(listing.length);
            })
            .catch((err) => {
              throw err;
            });
        };
        scrapePropertyData();
      });
    })
    .catch((err) => {
      throw err;
    });
}

// rentalPropertyLinks(firstUrl);

// test

app.get("/api", (req, res) => {
  console.log("Received /api request...");
  res.send({ message: "Hello from server" });
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
