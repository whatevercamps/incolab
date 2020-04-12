const express = require("express");

const ModelGenerator = require("../models/project");
const model = ModelGenerator();

const NOT_FOUND_STATUS_CODE = 404;
const INTERNAL_SERVER_ERROR_CODE = 500;
const OK_STATUS_CODE = 200;

const router = express.Router();

router.get("/projects", (req, res) => {
  model
    .connect()
    .then((client) => model.getProjects(client))
    .then((projects) => {
      if (!projects)
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .json({ success: false, msg: "projects with query not found" });
      res.status(OK_STATUS_CODE).json({ success: true, data: projects });
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR_CODE).json({
        success: false,
        msg: "Internal error retrieving projects",
        error: err,
      });
    });
});

module.exports = router;
