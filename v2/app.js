const express = require("express");
const SampleRoutes = require("./routes/sample.route");
const app = express();

// middleware to parse the body of the request and make it available in the req.body object
app.use(express.json());

// root route - to check if the server is up
app.get("/", (req, res) => {
  res.status(200).json({ alive: "True" });
});

// Telling the server to use the routes in the SampleRoutes file
app.use("/api", SampleRoutes);

module.exports = app;
