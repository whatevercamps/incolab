const express = require("express");

const ModelGenerator = require("../models/project");
const model = ModelGenerator();

const inputValidator = require("../utils/input-validator");
const { validationResult } = require("express-validator");

const NOT_FOUND_STATUS_CODE = 404;
const INTERNAL_SERVER_ERROR_CODE = 500;
const OK_STATUS_CODE = 200;
const BAD_REQUEST_CODE = 400;

const router = express.Router();

router.get("/", (req, res) => {
  model
    .connect()
    .then((client) => model.getProjects(client, req.query.query))
    .then((projects) => {
      if (!projects)
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .json({ success: false, msg: "projects with query not found" });
      res.status(OK_STATUS_CODE).json({ success: true, projects: projects });
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR_CODE).json({
        success: false,
        msg: "Internal error retrieving projects",
        error: err,
      });
    });
});

router.post("/", inputValidator("createPublicProject"), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST_CODE).json({
      success: false,
      msg: "Project payload is required",
      error: errors.array(),
    });
  }

  const project = {
    name: req.body.name,
    create: req.body.create,
    description: req.body.description,
    links: req.body.links || [],
    tags: req.body.tags,
  };

  model
    .connect()
    .then((client) => model.createProject(client, req.body.teamId, project))
    .then((resp) => {
      res.status(OK_STATUS_CODE).json({
        success: true,
        msg: "Public project created successfully",
        data: resp,
      });
    })
    .catch((err) => {
      return res.status(INTERNAL_SERVER_ERROR_CODE).json({
        success: false,
        msg: "Failure creating public project",
        error: err,
      });
    });
});

module.exports = router;
