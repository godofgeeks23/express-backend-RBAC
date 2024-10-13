const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT || 5000;

require("dotenv").config();

// connect to the db and then starting the API web server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(
      PORT,
      console.log(`Connected to DB and Server started on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
