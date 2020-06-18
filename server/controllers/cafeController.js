const fetch = require('node-fetch');

require('dotenv').config();

const cafeController = {};


cafeController.getCafes = (req, res, next) => {
  console.log('req', req.params);
  const baseUrl = 'https://api.yelp.com/v3/businesses/search?term=coffee&location=LA';
  fetch(baseUrl, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  })
    .then((result) => result.json())
    .then((data) => {
      res.locals.coffeeHouses = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const cafe of data.businesses) {
        const coffeeShop = {
          shopId: cafe.id,
          shopName: cafe.name,
          shopImg: cafe.image_url,
          shopAddress: cafe.location.address1,
          shopCity: cafe.location.city,
          shopZip: cafe.location.zip_code,
          shopPhone: cafe.phone,
        };
        res.locals.coffeeHouses.push(coffeeShop);
      }
      return next();
    })
    .catch((err) => next({ err }));
};

module.exports = cafeController;
