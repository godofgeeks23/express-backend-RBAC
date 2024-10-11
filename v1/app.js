// Required library here
const express = require("express");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const User = require("./models/user");
const { auth, checkRole } = require("./middlewares/auth");
const { ObjectId } = require("mongodb");
const dotenv = require("dotenv");
const { ROLE } = require("./config/roles");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_CORS_CONFIG,

    credentials: true,
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
  })
);

app.use(bodyparser.urlencoded({ extended: false, limit: "5mb" }));
app.use(bodyparser.json({ limit: "5mb" }));
app.use(cookieParser());
// app.use(limiter);

process.on("uncaughtException", async (err) => {
  // Handle the error safely
  console.log(err);
});

// adding new user (sign-up route)
app.post("/user/register", function (req, res) {
  const newuser = new User(req.body);
  console.log(newuser);

  User.findOne({ email: newuser.email }, function (err, user) {
    if (user)
      return res
        .status(400)
        .json({ auth: false, message: "Email already exits" });

    newuser.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false });
      }
      res.status(200).json({
        succes: true,
        user: doc,
      });
    });
  });
});

// login user
app.post("/auth/login", function (req, res) {
  let token = req.cookies.auth || "";

  User.findByToken(token, async (err, user) => {
    if (err) {
      console.log("err in fiding the token...");
    }
    if (user) {
      user.update({ $unset: { token: 1 } }, function (err) {
        if (err) return cb(err);
        return res.json({
          error: true,
          message: "Please login again.",
        });
      });
    } else {
      User.findOne({ email: req.body.email }, async function (err, user) {
        if (!user)
          return res.json({
            isAuth: false,
            message: " Login failed , email not found",
          });

        user.comparepassword(req.body.password, (err, isMatch) => {
          // debugger
          if (!isMatch)
            return res.json({
              isAuth: false,
              message: "password doesn't match",
            });

          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            console.log("saving token auth in cookies...");
            res.cookie("auth", user.token).json({
              isAuth: true,
              id: user._id,
              email: user.email,
              bearer_token: user.token,
              role: user.role,
            });
          });
        });
      });
    }
  });
});

//logout user
app.get("/auth/logout", auth, function (req, res) {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

// get logged in user
app.get("/user/profile", auth, async function (req, res) {
  try {
    res.json({
      isAuth: true,
      id: req?.user?._id,
      email: req?.user?.email,
      name: req?.user?.fname + req?.user?.lname || req?.user?.username,
      role: req?.user?.role,
    });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
});

app.get("/", async function (req, res) {
  res
    .status(200)
    .send("Server is running. Please use the API endpoints to access data.");
});

app.get("/role/adminOnly", auth, checkRole([ROLE.admin]), async (req, res) => {
  res.json({
    status: "ok",
    message: "You are authorized to access this role!",
  });
});

app.get("/role/userOnly", auth, checkRole([ROLE.user]), async (req, res) => {
  res.json({
    status: "ok",
    message: "You are authorized to access this role!",
  });
});

app.get(
  "/role/userAndAdmin",
  auth,
  checkRole([ROLE.admin, ROLE.user]),
  async (req, res) => {
    res.json({api
      status: "ok",
      message: "You are authorized to access this role!",
    });
  }
);

module.exports = app;
