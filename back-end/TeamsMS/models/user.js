"use strict";

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const ModelGenerator = () => {
  var model = {};
  let dbUrl = process.env.DB_URL || "";
  let dbName = process.env.DB_NAME || "";

  model.connect = () => {
    const client = new MongoClient(dbUrl, { useNewUrlParser: true });
    return client.connect();
  };

  model.getUserById = (client, id) => {
    const UsersCollection = client.db(dbName).collection("users");
    return UsersCollection.find({ _id: new ObjectID(id || "") })
      .toArray()
      .finally(() => {
        client.close();
      });
  };

  return model;
};

module.exports = ModelGenerator;
