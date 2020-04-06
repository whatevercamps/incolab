'use strict';

const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
// const ObjectID = require('mongodb').ObjectID;
dotenv.config();

const mongoUtils = () => {
  var mu = {};
  let dbHostName = process.env.dbHostName || '';
  let dbName = process.env.dbName || '';
  let dbUser = process.env.dbUser || '';
  let dbPassword = process.env.dbPassword || '';

  mu.connect = () => {
    const url = `mongodb+srv://${dbUser}:${dbPassword}@${dbHostName}?retryWrites=true&w=majority`;
    console.log(url);

    const client = new MongoClient(url, { useNewUrlParser: true });
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

  return mu;
};

module.exports = mongoUtils;