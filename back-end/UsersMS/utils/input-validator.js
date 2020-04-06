const { check } = require('express-validator');

module.exports = method => {
  switch (method) {
    case 'addUser': {
      return [
        check('email').exists().normalizeEmail().isEmail(),
        check('name').exists().isString().isLength({ min: 2, max: 40 }),
        check('password').exists().isString().isLength({ min: 8, max: 40 })
      ];
    }

    case 'authUser': {
      return [
        check('email').exists().normalizeEmail().isEmail(),
        check('password').exists().isString().isLength({ min: 8, max: 40 })
      ];
    }
  }
};
