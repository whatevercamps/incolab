const { check } = require("express-validator");

module.exports = (method) => {
  switch (method) {
    case "queryProjects": {
      return [
        check("keywords").exists().normalizeEmail().isEmail(),
        check("name").exists().isString().isLength({ min: 2, max: 40 }),
      ];
    }
    case "createPublicProject": {
      return [
        check("teamId").not().isEmpty().trim().not().isEmpty().escape(),
        check("name")
          .exists()
          .isString()
          .isLength({ min: 4, max: 26 })
          .trim()
          .not()
          .isEmpty(),
        check("description")
          .exists()
          .isString()
          .isLength({ min: 12, max: 256 })
          .trim()
          .not()
          .isEmpty(),
        check("links").if(check("links").exists()).isArray({ min: 0, max: 3 }),
        check("tags").exists().isArray({ min: 3, max: 20 }),
        check("create").exists(),
      ];
    }
  }
};
