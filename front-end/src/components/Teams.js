import React from "react";
import TeamsSidebar from "./TeamsSidebar";
import TeamDetail from "./TeamDetail";
import TeamsProyects from "./TeamsProyects";
import "../index.css";

const Teams = () => (
  <div className='Teams'>
    <TeamsSidebar />
    <TeamDetail />
    <TeamsProyects />
  </div>
);

export default Teams;
