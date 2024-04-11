const express = require("express");
const db = require("../config/db");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// web scraping with cheerio
const firstUrl =
  "https://www.privatepropertykenya.com/apartment-for-rent?search=Nairobi&bedroom=&min_price=&max_price=&button=&page=10";

async function propertyData(url) {
  //link to each property listing
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
      // console.log(propertyLinks);

      // extract data from each property link
      propertyLinks.forEach(async (propertyLink) => {
        let propertyUrl = `https://www.privatepropertykenya.com${propertyLink.listingUrl}`;

        await axios.get(propertyUrl).then((response) => {
          const html = response.data;
          const $ = cheerio.load(html);
          let listing = [];

          const title = $("div.property-info").find(" h1").text();
          const price = parseInt(
            $("p.price")
              .find("strong:last")
              .text()
              .replace(/[, per month]/g, ""),
            10
          );
          const location = $("div.property-info")
            .find("p:first")
            .text()
            .replace(/\n/g, "")
            .trim();
          const description = $("div.description-list")
            .text()
            .replace(/\n/g, "");
          const bed = $("ul.property-benefit")
            .find("li:first")
            .text()
            .replace(/\n/g, "")
            .trim();
          const bath = $("ul.property-benefit")
            .find("li:nth(2)")
            .text()
            .replace(/\n/g, "")
            .trim();
          const imgUrl = $("div.product-slider-item").find("img").attr("src");
          const property_owner = $("a.media").find("div.media-body > p").text();
          const contact = $("div.agent-contact-phones")
            .find("h5 > a")
            .attr("href")
            .replace(/[tel:]/g, "")
            .trim();
          listing.push({
            title,
            price,
            location,
            description,
            bed,
            bath,
            imgUrl,
            property_owner,
            contact,
          });

          console.log(listing.length);
          sendData(listing);
        });
      });
      // loop end
    })
    .catch((err) => {
      throw err;
    });
}

const sendData = (listing) => {
  for (let i = 0; i < listing.length; i++) {
    let property = {
      property_title: listing[i].title,
      // property_type: "Rent",
      property_type: "Sale",
      // property_category: "Apartment",
      property_category: "House",
      property_location: listing[i].location,
      property_image_url: listing[i].imgUrl,
      property_price: listing[i].price,
      bedrooms: listing[i].bed,
      bathrooms: listing[i].bath,
      property_description: listing[i].description,
      property_owner_name: listing[i].property_owner,
      property_owner_contact: listing[i].contact,
    };
    let sql = " INSERT INTO property SET ? ";
    let query = db.query(sql, property, (err, result) => {
      if (err) {
        throw err;
      }
      console.log("property data submitted ");
    });
  }
};

module.exports = propertyData;
