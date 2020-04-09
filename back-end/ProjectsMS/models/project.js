"use strict";

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const ModelGenerator = () => {
  let model = {};
  let dbURL = process.env.DB_URL || "";
  let dbName = process.env.DB_NAME || "";
  const collection = "projects";
  const handler = (client, collection) =>
    client.db(dbName).collection(collection || this.collection);

  model.connect = () => {
    const client = new MongoClient(dbURL, { useNewUrlParser: true });
    return client.connect();
  };

  model.getProjects = (client, keywords) => {
    return (UsersCollection = handler()
      .find()
      .toArray()
      .finally(() => {
        client.close();
      }));
  };

  return model;
};

module.exports = ModelGenerator;
