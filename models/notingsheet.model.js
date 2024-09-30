const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// schema for the sample model
const notingsheetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sample", sampleSchema);
