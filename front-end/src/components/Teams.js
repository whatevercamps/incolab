import React from "react";
import Navbar from "../layout/Navbar";
import TeamsSidebar from "./TeamsSidebar";
import TeamDetail from "./TeamDetail";
import TeamsProyects from "./TeamsProyects";
import "../index.css";

const Teams = () => (
  <div className='Teams'>
    <Navbar />
    <TeamsSidebar />
    <TeamDetail />
    <TeamsProyects />
  </div>
);

export default Teams;
