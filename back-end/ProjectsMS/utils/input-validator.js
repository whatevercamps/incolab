const { check } = require("express-validator");

module.exports = (method) => {
  switch (method) {
    case "queryProjects": {
      return [
        check("keywords").exists().normalizeEmail().isEmail(),
        check("name").exists().isString().isLength({ min: 2, max: 40 }),
      ];
    }
  }
};
