"use strict";

const MongoClient = require("mongodb").MongoClient;

const ModelGenerator = () => {
  let model = {};
  let dbURL = process.env.DB_URL || "";
  let dbName = process.env.DB_NAME || "";
  const collection = "projects";
  const handler = (client, pcollection) =>
    client.db(dbName).collection(pcollection || collection);

  model.connect = () => {
    const client = new MongoClient(dbURL, { useNewUrlParser: true });
    return client.connect();
  };

  model.getProjects = (client) => {
    return handler(client)
      .find()
      .toArray()
      .finally(() => {
        client.close();
      });
  };

  return model;
};

module.exports = ModelGenerator;
