const express = require("express");
const cors = require("cors");
const corsOptions = require("./config");
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");
const path = require('path');

const app = express();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors(corsOptions));


//  CORS Headers
if (process.env.NODE_ENV !== 'production') {
	const allowCrossDomain = function(req, res, next) {
		res.header('Access-Control-Allow-Origin', "*");
		res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, x-auth-token');
		next();
	};
	app.use(allowCrossDomain);
	if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
}
  

// parsing the .env file and assigning it to process.env
dotenv.config({
  path: "./.env",
});

// Adyen Payment API Implementation Begins
const {Client, Config, CheckoutAPI} = require('@adyen/api-library');
const { v4: uuidv4 } = require('uuid');

// Adyen Server Library
const config = new Config();
config.apiKey = 'AQEyhmfxK4/JbBdBw0m/n3Q5qf3VaY9UCJ14XWZE03G/k2NFisUQ3oG4gUxAeoX8kJuJ8SMQwV1bDb7kfNy1WIxIIkxgBw==-rvbCbqVGh/HefmNBTUx3Hy2jhcrmc4HUbv+0whHaRaI=-KD,Lt*nb~m4z(2^<';
config.merchantAccount = 'AdyenRecruitment_NY1';
const client = new Client({ config });
client.setEnvironment("TEST");
const checkout = new CheckoutAPI(client);

// Adyen Server Method Calls
const paymentStore = {};
const originStore = {};

/* ################# API ENDPOINTS ###################### */
app.get("/api/getPaymentDataStore", async (req, res) => res.json(paymentStore));

// Get payment methods
app.post("/api/getPaymentMethods", async (req, res) => {
  try {
    const response = await checkout.paymentMethods({
      channel: "Web",
      merchantAccount: config.merchantAccount,
    });
    res.json(response);
  } catch (err) {
    console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
    res.status(err.statusCode).json(err.message);
  }
});

// Submitting a payment
app.post("/api/initiatePayment", (req, res) => {
  const currency = findCurrency(req.body.paymentMethod);
  // find shopper IP from request
  const shopperIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    // unique ref for the transaction
    const orderRef = uuidv4();
    // Ideally the data passed here should be computed based on business logic
    const response = checkout.payments({
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
    return res.json([response, orderRef]); // sending a tuple with orderRef as well to be used in in submitAdditionalDetails if needed
  } catch (err) {
    console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
    res.status(err.statusCode).json(err.message);
  }
});

app.post("/api/submitAdditionalDetails", async (req, res) => {
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
});

// Handle all redirects from payment type
app.all("/api/handleShopperRedirect", async (req, res) => {
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
});

function findCurrency(type) {
  switch (type) {
    case "wechatpayqr":
    case "alipay":
      return "CNY";
    case "dotpay":
      return "PLN";
    case "boletobancario":
      return "BRL";
    default:
      return "EUR";
  }
}

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  app.get('*', cors(corsOptions), (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});