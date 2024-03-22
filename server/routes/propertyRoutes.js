// CURRENTLY NOT USED

const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/properties", (req, res) => {
  const limit = parseInt(req.query.limit) || 9;
  const startIndex = parseInt(req.query.startIndex) || 0;

  let sql = " SELECT * FROM property ";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("property data retrieved ");
    res.send(result);
  });
});

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

module.exports = router;
