const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// This is creating a new schema for the product model.
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
