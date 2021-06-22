const {Client, Config, CheckoutAPI} = require('@adyen/api-library');
const { uuid } = require("uuidv4");

// Adyen Server Library
const config = new Config();
config.apiKey = 'AQEyhmfxK4/JbBdBw0m/n3Q5qf3VaY9UCJ14XWZE03G/k2NFisUQ3oG4gUxAeoX8kJuJ8SMQwV1bDb7kfNy1WIxIIkxgBw==-rvbCbqVGh/HefmNBTUx3Hy2jhcrmc4HUbv+0whHaRaI=-KD,Lt*nb~m4z(2^<';
config.merchantAccount = 'AdyenRecruitment_NY1';
const client = new Client({ config });
client.setEnvironment("TEST");
const checkout = new CheckoutAPI(client);


// A temporary store to keep payment data to be sent in additional payment details and redirects.
// This is more secure than a cookie. In a real application this should be in a database.
const paymentDataStore = {};

module.exports = {
    async getPaymentMethod(req, res) {
        try {
            const response = await checkout.paymentMethods({
                channel: "Web",
                merchantAccount: config.merchantAccount,
            });
            res.json(response);
            } catch (err) {
                onsole.error(`Error: ${err.message}, error code: ${err.errorCode}`);
                res.status(err.statusCode).json(err.message);
            }
    },

    // Submitting a payment
    async initiatePayment (req, res)  {
    const currency = findCurrency(req.body.paymentMethod.type);
    // find shopper IP from request
    const shopperIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  
    try {
      // unique ref for the transaction
      const orderRef = uuid();
      // Ideally the data passed here should be computed based on business logic
      const response = await checkout.payments({
        amount: { currency, value: 1000 }, // value is 10€ in minor units
        reference: orderRef, // required
        merchantAccount: config.merchantAccount, // required
        channel: "Web", // required
        additionalData: {
          // required for 3ds2 native flow
          allow3DS2: true,
        },
        origin: "http://localhost:8080", // required for 3ds2 native flow
        browserInfo: req.body.browserInfo, // required for 3ds2
        shopperIP, // required by some issuers for 3ds2
        returnUrl: `http://localhost:8080/api/handleShopperRedirect?orderRef=${orderRef}`, // required for 3ds2 redirect flow
        paymentMethod: req.body.paymentMethod,
        billingAddress: req.body.billingAddress,
      });
  
      const { action } = response;
  
      // save transaction in memory
      paymentStore[orderRef] = {
        amount: { currency, value: 1000 },
        reference: orderRef,
      };
  
      if (action) {
        const originalHost = new URL(req.headers["referer"]);
        if (originalHost) {
          originStore[orderRef] = originalHost.origin;
        }
      } else {
        paymentStore[orderRef].paymentRef = response.pspReference;
        paymentStore[orderRef].status = response.resultCode;
      }
      res.json([response, orderRef]); // sending a tuple with orderRef as well to be used in in submitAdditionalDetails if needed
    } catch (err) {
      console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
      res.status(err.statusCode).json(err.message);
    }
    },
  
    async submitAdditionalDetails (req, res){
    // Create the payload for submitting payment details
    const payload = {
      details: req.body.details,
      paymentData: req.body.paymentData,
    };
  
    try {
      // Return the response back to client
      // (for further action handling or presenting result to shopper)
      const response = await checkout.paymentsDetails(payload);
  
      if (!response.action) {
        paymentStore[req.query.orderRef].paymentRef = response.pspReference;
        paymentStore[req.query.orderRef].status = response.resultCode;
      }
      res.json(response);
    } catch (err) {
      console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
      res.status(err.statusCode).json(err.message);
    }
    },
  
    // Handle all redirects from payment type
    async handleShopperDirect(req, res) {
    // Create the payload for submitting payment details
    const orderRef = req.query.orderRef;
    const redirect = req.method === "GET" ? req.query : req.body;
    const details = {};
    if (redirect.redirectResult) {
      details.redirectResult = redirect.redirectResult;
    } else if (redirect.payload) {
      details.payload = redirect.payload;
    }
  
    const originalHost = originStore[orderRef] || "";
  
    try {
      const response = await checkout.paymentsDetails({ details });
      if (response.resultCode) {
        paymentStore[orderRef].paymentRef = response.pspReference;
        paymentStore[req.query.orderRef].status = response.resultCode;
      }
      // Conditionally handle different result codes for the shopper
      switch (response.resultCode) {
        case "Authorised":
          res.redirect(`${originalHost}/status/success`);
          break;
        case "Pending":
        case "Received":
          res.redirect(`${originalHost}/status/pending`);
          break;
        case "Refused":
          res.redirect(`${originalHost}/status/failed`);
          break;
        default:
          res.redirect(`${originalHost}/status/error?reason=${response.resultCode}`);
          break;
      }
    } catch (err) {
      console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
      res.redirect(`${originalHost}/status/error?reason=${err.message}`);
    }
    },
  
}

    