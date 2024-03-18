const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

// web scraping with cheerio
const firstUrl =
  "https://www.privatepropertykenya.com/apartment-for-rent?search=Nairobi&bedroom=&min_price=&max_price=&button=&page=10";

async function rentalPropertyData(url) {
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
              const imgUrl = $("div.product-slider-item")
                .find("img")
                .attr("src");
              const property_owner = $("a.media")
                .find("div.media-body > p")
                .text();
              const contact = $("div.agent-contact-phones")
                .find("h5 > a")
                .attr("href");
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
              console.log(listing);
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

// rentalPropertyData(firstUrl);

module.exports = rentalPropertyData;
