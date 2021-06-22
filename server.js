const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const route = require("./routes");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));


const db = require("./models");
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// simple route
route(app)


app.get("/", (req, res) => {
  res.json({ message: "Adyen Payment Implementation application." });
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});