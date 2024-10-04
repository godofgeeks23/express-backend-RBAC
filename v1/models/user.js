var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const confiq = require("../config/config").get(process.env.NODE_ENV);
const validator = require("validator");
const salt = 10;

const userSchema = new mongoose.Schema({
  fname: { type: String, default: null },
  mname: { type: String, default: null },
  lname: { type: String, default: null },
  username: { type: String, trim: true, default: null },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: { type: String, default: null }, // password
  createdDate: { type: Date, default: Date.now }, // date of creation of user
  role: { type: String, default: "user", required: true }, // role id of this user (100 - manager, 102 - engineer/developer)
  token: { type: String, default: null }, // token for login
  token_created_at: { type: Date, default: Date.now }, // token creation time
});

// to signup a user
userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(salt, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        user.password2 = hash;
        next();
      });
    });
  } else {
    next();
  }
});

//to login
userSchema.methods.comparepassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    // console.log(password, this.password)
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// generate token
userSchema.methods.generateToken = function (cb) {
  var user = this;
  console.log(
    "generating auth token for user... using secret key: " + confiq.SECRET
  );
  const token = jwt.sign(
    { data: user._id },
    confiq.SECRET,
    function (err, token) {
      if (err) {
        console.log("Error in login token generation - ", err);
      } else {
        console.log("Login Token generated.");
        user.token = token;
        user.token_created_at = Date.now();

        user.save(function (err, user) {
          if (err) return cb(err);
          cb(null, user);
        });
      }
    }
  );
};

// find by token
userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  jwt.verify(token, confiq.SECRET, function (err, decode) {
    try {
      user.findOne({ _id: decode.data, token: token }, function (err, user) {
        if (err) return cb(err);
        cb(null, user);
      });
    } catch (err) {
      console.log("error:", err);
      cb(true, null);
    }
  });
};

//delete token
userSchema.methods.deleteToken = function (token, cb) {
  var user = this;
  user.update({ $unset: { token: 1 } }, function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

module.exports = mongoose.model("users", userSchema);
