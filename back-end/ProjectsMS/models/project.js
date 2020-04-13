"use strict";

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const ModelGenerator = () => {
  let model = {};
  let dbURL = process.env.DB_URL || "";
  let dbName = process.env.DB_NAME || "";
  const collection = "projects";
  const handler = (client, pcollection) =>
    client.db(dbName).collection(pcollection || collection);

  model.connect = () => {
    const client = new MongoClient(dbURL, { useNewUrlParser: true });
    return client.connect().catch(function (e) {
      console.log("current dburl", dbURL);
      console.log("catch in connect", e);
      throw e; //
    });
  };

  model.getProjects = (client, q) => {
    let query = {};

    const buildRgx = (word) => new RegExp(`.*${word}.*`, "i");

    const genSubQuery = (keyword) => {
      return {
        $or: [{ name: buildRgx(keyword) }, { tags: buildRgx(keyword) }],
      };
    };
    if (q) {
      query = { $or: [] };
      const keywords = q.trim().split(/[\s,]+/);
      keywords.forEach((keyword) => {
        query.$or.push(genSubQuery(keyword));
      });
    }
    console.log("query", query);
    return handler(client)
      .find(query)
      .toArray()
      .catch(function (e) {
        console.log("catch in model", e);
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  model.createProject = (client, teamId, project) => {
    console.log("project1", project);
    project["team_id"] = new ObjectID(teamId);
    console.log("project2", project);
    return handler(client)
      .insert(project)
      .catch(function (e) {
        console.log("catch in model", e);
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  return model;
};

module.exports = ModelGenerator;
