const fetch = require('node-fetch');
const router = require("express").Router();

require('dotenv').config();

router.get("/", async (req, res) => {
  try {
    const baseUrl = 'https://api.yelp.com/v3/businesses/search?location=LA';
    fetch(baseUrl, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        console.log("data", data)
        res.locals.businesses = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const cafe of data.businesses) {
          const business = {
            shopId: cafe.id,
            shopName: cafe.name,
            shopImg: cafe.image_url,
            shopAddress: cafe.location.address1,
            shopCity: cafe.location.city,
            shopZip: cafe.location.zip_code,
            shopPhone: cafe.phone,
          };
          res.locals.businesses.push(business);
        }
      })
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error.")
  }
})

module.exports = router;  