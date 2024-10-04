const dotenv = require("dotenv");

// load the environment variables from the .env file
dotenv.config({ path: __dirname + "/./../.env" });

const config = {
  production: {
    SECRET: process.env.JWT_SECRET,
    DATABASE: process.env.MONGODB_URL,
  },
};

exports.get = function get(env) {
  // return config[env] || config.default
  return config.production;
};
