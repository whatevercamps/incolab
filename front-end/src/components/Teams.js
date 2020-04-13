import React, { useState } from "react";
import TeamsSidebar from "./TeamsSidebar";
import TeamDetail from "./TeamDetail";
import TeamsProyects from "./TeamsProyects";
import "../index.css";

const Teams = () => {
  const [teamId, setTeamId] = useState(null);

  const changeTeamId = (id) => {
    console.log("new id", id);
    setTeamId(id);
  };
  return (
    <div className='Teams'>
      <TeamsSidebar changeTeamId={changeTeamId} />
      {teamId && <TeamDetail teamId={teamId} />}
      <TeamsProyects />
    </div>
  );
};

export default Teams;
