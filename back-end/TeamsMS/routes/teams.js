const express = require("express");
const router = express.Router();
const ModelGenerator = require("../models/team.js");
const mu = ModelGenerator();

const passport = require("passport");
const inputValidator = require("../utils/input-validator");
const { validationResult } = require("express-validator");

const OK_STATUS_CODE = 200;
const INTERNAL_SERVER_ERROR_CODE = 500;
const BAD_REQUEST_CODE = 400;

const buildQuery = (query) => ({
  name: new RegExp(`.*${query}.*`, "i"),
});

/* GET teams. */
router.get("/getTeams", (req, res) => {
  const query = buildQuery({ name: req.query.name });
  mu.connect()
    .then((client) => mu.getTeams(client, query))
    .then((teams) => res.json(teams));
});

router.get(
  "/getAuthTeams",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    mu.connect()
      .then((client) => mu.getTeamsByUserId(client, req.user._id))
      .then((teams) => res.json(teams));
  }
);

router.get(
  "getTeam/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    mu.connect().then((client) =>
      client.getTeamById(client, req.params.id).then((team) => res.json(team))
    );
  }
);

/* POST create a team */
router.post(
  "/createTeam",
  inputValidator("authCreateTeam"),
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        msg: "Email and password is required",
        error: errors.array(),
      });
    }
    const newTeam = {
      name: req.body.name,
      description: req.body.description,
      tags: req.body.tags || [],
    };
    mu.connect()
      .then((client) => mu.createTeam(client, newTeam, req.user))
      .then((resp) => {
        res.status(OK_STATUS_CODE).json({
          success: true,
          msg: "Team Created",
          data: resp,
        });
      })
      .catch((err) => {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
          success: false,
          msg: "Failure creating Team",
          error: err,
        });
      });
  }
);

module.exports = router;
