// CURRENTLY NOT USED

const express = require("express");
const router = express.Router();
const db = require("../config/db");
const rentalPropertyData = require("./scrapeData");

const rentalApartment =
  "https://www.privatepropertykenya.com/apartment-for-rent?search=Nairobi&bedroom=&min_price=&max_price=&button=&page=10";

router.get("/apartmentrent", (req, res) => {
  PropertyData(rentalApartment);
  let property = {
    property_title: listing.title,
    property_location: listing.location,
    property_image_url: listing.imgUrl,
    property_price: listing.price,
    no_of_beds: listing.bed,
    no_of_baths: listing.bath,
    property_description: listing.description,
    property_owner_name: listing.property_owner,
    property_owner_contact: listing.contact,
  };
  let sql = " INSERT INTO property SET ? ";
  let query = db.query(sql, property, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("property data submitted ");
    res.send(result);
  });
});
module.exports = router;
