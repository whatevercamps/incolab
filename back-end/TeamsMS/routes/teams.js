const express = require('express');
const router = express.Router();
const mongoUtils = require('../db/utils.js');
const mu = mongoUtils();

const OK_STATUS_CODE = 200;
const INTERNAL_SERVER_ERROR_CODE = 500;

const buildQuery = query => ({
  name: new RegExp(`.*${query}.*`, 'i')
});

/* GET home page. */
router.get('/getTeams', (req, res) => {
  const query = buildQuery(req.query.name);
  mu.connect()
    .then(client => mu.getTeams(client, query))
    .then(teams => res.render('teams', {teams}));
});

/* POST create a team */
router.post('/createTeam', (req, res) => {

  const team = {
    name: req.body.name,
    users: [req.user.name]
  };
  mu.connect()
    .then(client => mu.createTeam(client, team))
    .then((resp) => {
      res.status(OK_STATUS_CODE).json({
        success: true,
        msg: 'Team Created',
        data: resp,
      });
    })
    .catch((err) => {
      return res.status(INTERNAL_SERVER_ERROR_CODE).json({
        success: false,
        msg: 'Failure creating Team',
        error: err,
      });
    });
});

module.exports = router;
