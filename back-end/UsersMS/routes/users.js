const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const inputValidator = require('../utils/input-validator');
const config = require('../config/db');
const User = require('../models/user');

const router = express.Router();

const UNAUTHORIZED_CODE = 401;
const BAD_REQUEST_CODE = 400;
const INTERNAL_SERVER_ERROR_CODE = 500;
const OK_STATUS_CODE = 200;

// Register
router.post('/register', inputValidator('addUser'), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(BAD_REQUEST_CODE)
      .json({ success: false, errors: errors.array() });
  }

  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  User.createUser(newUser, (err, user) => {
    if (err)
      return res.status(INTERNAL_SERVER_ERROR_CODE).json({
        success: false,
        error: err
      });
    else {
      res.status(OK_STATUS_CODE).json({
        success: true,
        data: user
      });
    }
  });
});

// Authenticate
router.post('/authenticate', inputValidator('authUser'), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(BAD_REQUEST_CODE)
      .json({ success: false, errors: errors.array() });
  }

  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if (err)
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .json({ success: false, error: err });
    if (!user) {
      return res.status(UNAUTHORIZED_CODE).json({
        success: false,
        error: 'Email or password wrong'
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(
          ((user['password'] = '*'), user).toJSON(),
          config.secret,
          {
            expiresIn: 3600 //60 minutes
          }
        );

        res.status(OK_STATUS_CODE).json({
          success: true,
          token: `JWT ${token}`
        });
      } else {
        return res.status(UNAUTHORIZED_CODE).json({
          success: false,
          error: 'Email or password wrong'
        });
      }
    });
  });
});

// Profile
router.get(
  '/profile',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    let user = req.user;
    delete user['password'];
    res.status(OK_STATUS_CODE).json({
      user: ((user['password'] = '*'), user)
    });
  }
);

router.get('*', (req, res) => {
  res.json({ req: req });
});

module.exports = router;
