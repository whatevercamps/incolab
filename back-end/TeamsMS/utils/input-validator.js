const { check, query } = require("express-validator");

module.exports = (method) => {
  switch (method) {
    case "authCreateTeam": {
      return [
        check("name").exists().isString().isLength({ min: 4, max: 12 }),
        check("tags").exists().isArray({ min: 3, max: 20 }),
      ];
    }
    case "getTeamProjects": {
      return [query("team_id").not().isEmpty().trim().not().isEmpty().escape()];
    }
    case "createTeamProject": {
      return [
        query("team_id").not().isEmpty().trim().not().isEmpty().escape(),
        check("name")
          .exists()
          .isString()
          .isLength({ min: 4, max: 12 })
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
      ];
    }
  }
};
