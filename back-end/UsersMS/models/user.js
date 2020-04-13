"use strict";

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const ModelGenerator = () => {
  let model = {};
  let dbURL = process.env.DB_URL || "";
  let dbName = process.env.DB_NAME || "";

  model.connect = () => {
    const client = new MongoClient(dbURL, { useNewUrlParser: true });
    return client.connect();
  };

  model.createUser = (client, user) => {
    const UsersCollection = client.db(dbName).collection("users");
    return UsersCollection.insert(user).finally(() => {
      client.close();
    });
  };

  model.getUserById = (client, id) => {
    const UsersCollection = client.db(dbName).collection("users");
    return UsersCollection.find({ _id: new ObjectID(id || "") })
      .toArray()
      .finally(() => {
        client.close();
      });
  };

  model.getUsers = (client, query) => {
    const UsersCollection = client.db(dbName).collection("users");
    return UsersCollection.find(query)
      .toArray()
      .finally(() => {
        client.close();
      });
  };

  return model;
};

module.exports = ModelGenerator;
