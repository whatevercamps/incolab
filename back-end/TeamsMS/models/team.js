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

  model.getTeams = (client, query) => {
    const teamsHandler = client.db(dbName).collection("teams");
    return teamsHandler
      .find(query)
      .toArray()
      .finally(() => {
        console.log("cerrando cliente");
        client.close();
      });
  };

  model.getTeamsByUserId = (client, user_id) => {
    const teamsHandler = client.db(dbName).collection("teams");
    const query = {
      users: { $elemMatch: { _id: new ObjectID(user_id || "") } },
    };
    return teamsHandler
      .find(query)
      .toArray()
      .finally(() => {
        console.log("cerrando cliente");
        client.close();
      });
  };

  model.getTeamById = (client, id) => {
    const teamsHandler = client.db(dbName).collection("teams");
    return teamsHandler.findOne({ _id: new ObjectID(id || "") }).finally(() => {
      console.log("cerrando cliente");
      client.close();
    });
  };

  model.createTeam = (client, team, user) => {
    const newTeam = {
      name: team.name,
      description: team.description,
      tags: team.tags,
      projects: [],
      users: [
        { _id: new ObjectID(user._id || ""), name: user.name, role: "Owner" },
      ],
    };
    const teams = client.db(dbName).collection("teams");
    return teams.insert(newTeam).finally(() => client.close());
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
