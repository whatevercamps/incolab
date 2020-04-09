"use strict";

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const mongoUtils = () => {
  var mu = {};
  let dbUrl = process.env.DB_URL || "";
  let dbName = process.env.DB_NAME || "";

  mu.connect = () => {
    const client = new MongoClient(dbUrl, { useNewUrlParser: true });
    return client.connect();
  };

  mu.getTeams = (client, query) => {
    const teamsHandler = client.db(dbName).collection("teams");
    return teamsHandler
      .find(query)
      .toArray()
      .finally(() => {
        console.log("cerrando cliente");
        client.close();
      });
  };

  mu.createTeam = (client, team, user) => {
    const newTeam = {
      name: team.name,
      tags: team.tags,
      users: [
        { _id: new ObjectID(user._id || ""), name: user.name, role: "Owner" },
      ],
    };
    const teams = client.db(dbName).collection("teams");
    return teams.insert(newTeam).finally(() => client.close());
  };

  mu.getUserById = (client, id) => {
    const UsersCollection = client.db(dbName).collection("users");
    return UsersCollection.find({ _id: new ObjectID(id || "") })
      .toArray()
      .finally(() => {
        client.close();
      });
  };

  return mu;
};

module.exports = mongoUtils;
