const express = require("express");
const router = express.Router();
const db = require("../config/db");

// router.get("/properties", (req, res) => {
//   let sql = " SELECT * FROM property ";
//   let query = db.query(sql, (err, result) => {
//     if (err) {
//       throw err;
//     }
//     console.log("property data retrieved ");
//     res.send(result);
//   });
// });

router.get("/listing/:id", (req, res) => {
  let sql = `SELECT * FROM property WHERE property_id = ${req.params.id} `;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send(result);
  });
});

const getListings = async (req, res, next) => {
  try {
    const type = req.query.type || "all";
    const category = req.query.category || "all";
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || Infinity;
    const order = req.query.order || "DESC";
    const searchTerm = req.query.searchTerm || "";

    let sql = `SELECT * FROM property WHERE property_location LIKE '%${searchTerm}%'`;

    if (type !== "all") {
      sql += ` AND property_type = '${type}'`;
    }

    if (category !== "all") {
      sql += ` AND property_category = '${category}'`;
    }

    if (maxPrice !== Infinity) {
      sql += ` AND property_price BETWEEN ${minPrice} AND ${maxPrice}`;
    } else {
      sql += ` AND property_price >= ${minPrice}`;
    }
    sql += ` ORDER BY property_price ${order}`;

    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).json(result);
    });
  } catch (error) {
    throw error;
  }
};

router.get("/properties", getListings);

module.exports = router;
