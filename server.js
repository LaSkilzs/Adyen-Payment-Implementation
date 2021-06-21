const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("morgan");

var corsOptions = {
  origin: "http://localhost:5000"
};


app.use(cors(corsOptions));

// Log requests to the console.
app.use(logger("dev"));


const db = require("./models");
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Adyen Payment Implementation application." });
});
// app.get("/carts", (req, res) => {
//   res.json({ message: "is this one working at least." });
// });

require("./routes/cart.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});