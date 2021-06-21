require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 5000;
const corsOptions = require("./config").corsOptions;


const app = express();
app.use(cors());

// Log requests to the console.
app.use(logger("dev"));

// DEVELOPMENT DATABASE MANAGEMENT
const db = require("./config");
// db.sequelize.sync();
  

// RESET DEVELOPMENT DATABASE IF NECESSARY;
// db.sequelize.sync({force: true }).then(() => {
//   console.log("Drop and re-sync db")
// })


// TEST DB CONNECTION
try {
    db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

//Server static files from the React Frontend app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

// Require Routes in Application
require("./routes")(app);

//build mode -- Anything that doesnt' match the above, send back to index.html
app.get("*", cors(corsOptions), (request, response) => {
  response.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () =>
  console.log(`Adyen payment implementation is listening on port ${port}!`)
);

module.exports = app;