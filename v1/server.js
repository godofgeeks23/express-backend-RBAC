const mongoose = require("mongoose");
const dotenv = require("dotenv");
const db = require("./config/config").get(process.env.NODE_ENV);
const app = require("./app");

dotenv.config();

const PORT = process.env.BACKEND_PORT;

/* Connecting to the database and then starting the server. */
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true); // to suppress warning
mongoose.connect(
  db.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    if (err) console.log(err);
    else {
      console.log("Establishing connection with MongoDB - Success");
      app.listen(PORT, console.log("Server started on port " + PORT));
    }
  }
);
