const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// new schema for the product model
const sampleSchema = new Schema(
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
