const express = require("express");

const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator");
const inputValidator = require("../utils/input-validator");

const ModelGenerator = require("../models/user");
const model = ModelGenerator();

const router = express.Router();

const UNAUTHORIZED_CODE = 401;
const BAD_REQUEST_CODE = 400;
const INTERNAL_SERVER_ERROR_CODE = 500;
const OK_STATUS_CODE = 200;

// Register
router.post("/register", inputValidator("addUser"), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST_CODE).json({
      success: false,
      msg: "Name, email and password is required",
      errors: errors.array(),
    });
  }

  let newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(newUser.password, salt))
    .then((hash) => {
      newUser.password = hash;
      return model
        .connect()
        .then((client) => model.createUser(client, newUser))
        .then((resp) => {
          res.status(OK_STATUS_CODE).json({
            success: true,
            msg: "User registered",
            data: resp,
          });
        });
    })
    .catch((err) => {
      return res.status(INTERNAL_SERVER_ERROR_CODE).json({
        success: false,
        msg: "Failure registering user",
        error: err,
      });
    });
});

// Authenticate
router.post("/authenticate", inputValidator("authUser"), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST_CODE).json({
      success: false,
      msg: "Email and password is required",
      error: errors.array(),
    });
  }

  const email = req.body.email;
  const password = req.body.password;
  const query = { email: email };

  model
    .connect()
    .then((client) => model.getUsers(client, query))
    .then((users) => {
      if (!users || !users.length) {
        return res.status(UNAUTHORIZED_CODE).json({
          success: false,
          msg: "Email or password wrong",
        });
      }

      bcrypt
        .compare(password, users[0].password)
        .then((isMatch) => {
          if (isMatch) {
            const expiresTime = 60 * 60;
            const token = jwt.sign(users[0], process.env.SECRET, {
              expiresIn: expiresTime,
            });
            return res
              .status(200)
              .cookie("jwt", token, { httpOnly: true, secure: false })
              .redirect("/");
          } else {
            return res.json({
              success: false,
              msg: "Email or password wrong",
            });
          }
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(INTERNAL_SERVER_ERROR_CODE).json({
            success: false,
            msg: "error validating credentials",
            error: err,
          });
        });
    })
    .catch((err) => {
      console.log("error", err);
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ success: false, msg: "error in user auth", error: err });
    });
});

router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    let user = req.user;
    delete user["password"];
    res.status(OK_STATUS_CODE).json({
      success: true,
      user: ((user["password"] = "*"), user),
    });
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
  res.json({ ok: true });
});

module.exports = router;
