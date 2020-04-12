"use strict";

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const ModelGenerator = () => {
  let model = {};
  let dbURL = process.env.DB_URL || "";
  let dbName = process.env.DB_NAME || "";
  const collection = "teams";
  const handler = (client, pcollection) =>
    client.db(dbName).collection(pcollection || collection);

  model.connect = () => {
    const client = new MongoClient(dbURL, { useNewUrlParser: true });
    return client.connect();
  };

  model.getProjects = (client, teamId, userId) => {
    const query = {
      $and: [
        { _id: new ObjectID(teamId) },
        { users: { $elemMatch: { _id: new ObjectID(userId) } } },
      ],
    };
    console.log("query", query);
    return handler(client)
      .find(query)
      .toArray()
      .finally(() => {
        client.close();
      });
  };

  model.createProject = (client, teamId, userId, project) => {
    const query = {
      $and: [
        { _id: new ObjectID(teamId) },
        { users: { $elemMatch: { _id: new ObjectID(userId) } } },
      ],
    };
    return handler(client).findOneAndUpdate(
      query,
      { $push: { projects: project } },
      { new: true, useFindAndModify: false }
    );
  };
  return model;
};

module.exports = ModelGenerator;
