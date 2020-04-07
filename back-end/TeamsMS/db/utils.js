'use strict';

const MongoClient = require('mongodb').MongoClient;

const mongoUtils = () => {
  var mu = {};
  let dbUrl = process.env.DB_URL || '';
  let dbName = process.env.DB_NAME || '';

  mu.connect = () => {
    const client = new MongoClient(dbUrl, { useNewUrlParser: true });
    return client.connect();
  };

  mu.getTeams = (client, query) => {
    const teamsHandler = client.db(dbName).collection('teams');
    return teamsHandler
      .find(query)
      .toArray()
      .finally(() => {
        console.log('cerrando cliente');
        client.close();
      });
  };

  mu.createTeam = (client, team) => {
    const teams = client.db(dbName).collection('teams');
    return teams.insert(team)
      .finally(() => client.close());
  };

  return mu;
};

module.exports = mongoUtils;