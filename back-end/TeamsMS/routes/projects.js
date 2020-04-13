const express = require("express");

const inputValidator = require("../utils/input-validator");
const { validationResult } = require("express-validator");

const passport = require("passport");
const fetch = require("node-fetch");

const ModelGenerator = require("../models/teamProject");
const model = ModelGenerator();

const NOT_FOUND_STATUS_CODE = 404;
const INTERNAL_SERVER_ERROR_CODE = 500;
const OK_STATUS_CODE = 200;
const BAD_REQUEST_CODE = 400;

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  inputValidator("getTeamProjects"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        msg: "Team id is required",
        error: errors.array(),
      });
    }
    model
      .connect()
      .then((client) =>
        model.getProjects(client, req.query["team_id"], req.user._id)
      )
      .then((teams) => {
        if (!teams || !teams.length)
          return res
            .status(NOT_FOUND_STATUS_CODE)
            .json({ success: false, msg: "projects with query not found" });
        res.status(OK_STATUS_CODE).json({
          success: true,
          data:
            (teams[0].projects.map(
              (pr) => (pr.create_date = new Date(pr.create))
            ),
            teams[0].projects),
        });
      })
      .catch((err) => {
        console.log("error: ", err);
        res.status(INTERNAL_SERVER_ERROR_CODE).json({
          success: false,
          msg: "Internal error retrieving projects",
          error: err,
        });
      });
  }
);

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  inputValidator("createTeamProject"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        msg: "Team id and project payload is required",
        error: errors.array(),
      });
    }

    const date = Date.now();
    const project = {
      name: req.body.name,
      create: date,
      description: req.body.description,
      links: req.body.links || [],
      milestones: [],
      tags: req.body.tags,
    };

    const publicProject = {
      teamId: req.query.team_id,
      name: req.body.name,
      create: date,
      description: req.body.description,
      links: req.body.links || [],
      tags: req.body.tags,
    };

    model
      .connect()
      .then((client) =>
        model.createProject(client, req.query.team_id, req.user._id, project)
      )
      .then((resp) => {
        res.status(OK_STATUS_CODE).json({
          success: true,
          msg: "Project created successfully",
          data: resp,
        });
        if (req.body.isPrivate === false)
          fetch("http://localhost:3029/projects", {
            method: "POST",
            body: JSON.stringify(publicProject),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (!data || !data.success) {
                console.log("error creating public project", data);
              }
            });
      })
      .catch((err) => {
        return res.status(INTERNAL_SERVER_ERROR_CODE).json({
          success: false,
          msg: "Failure creating project",
          error: err,
        });
      });
  }
);

module.exports = router;
