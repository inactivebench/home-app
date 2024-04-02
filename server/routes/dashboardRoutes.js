const express = require("express");
const router = express.Router();
const db = require("../config/db");

//card one
router.get("/card1", (req, res) => {
  let sql = " SELECT COUNT(*) AS total_properties FROM property; ";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("total number of property  ");
    res.send(result);
  });
});

//card two
router.get("/card2", (req, res) => {
  let sql =
    " SELECT property_type, COUNT(*) AS type_count, CONCAT(ROUND((COUNT(*) / (SELECT COUNT(*) FROM property)) * 100), '%') AS percentage FROM property GROUP BY property_type; ";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("property number by property ");
    res.send(result);
  });
});

//bar
router.get("/barChart", (req, res) => {
  let sql =
    " SELECT CASE WHEN property_price < 50000 THEN '< 50k' WHEN property_price BETWEEN 50000 AND 100000 THEN ' 50k- 100k' WHEN property_price BETWEEN 100000 AND 150000 THEN ' 100k- 150k' WHEN property_price BETWEEN 150000 AND 200000 THEN ' 150k- 200k' WHEN property_price BETWEEN 200000 AND 250000 THEN ' 200k- 250k' WHEN property_price BETWEEN 250000 AND 300000 THEN ' 250k- 300k' ELSE '> 300k' END AS price_range,COUNT(*) AS no_of_property FROM property WHERE property_type = 'rent' GROUP BY price_range; ";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("bar chart data  ");
    res.send(result);
  });
});

//scatter
router.get("/scatter", (req, res) => {
  let sql =
    " SELECT bedrooms, property_price FROM property WHERE property_type = 'sale' and property_category = 'house' ; ";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("scatter data  ");
    res.send(result);
  });
});

//pie
router.get("/pie", (req, res) => {
  let sql =
    " SELECT property_category, COUNT(*) AS category_count FROM property GROUP BY property_category ; ";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("pie data  ");
    res.send(result);
  });
});

// table
router.get("/table", (req, res) => {
  let sql =
    " SELECT property_location,SUM(CASE WHEN property_type = 'rent' THEN 1 ELSE 0 END) AS rental_count, SUM(CASE WHEN property_type = 'sale' THEN 1 ELSE 0 END) AS sale_count, COUNT(*) AS property_count FROM property  GROUP BY property_location ORDER BY property_count DESC LIMIT 10; ";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("pie data  ");
    res.send(result);
  });
});
module.exports = router;
