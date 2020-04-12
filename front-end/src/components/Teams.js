import React, { useState } from "react";
import TeamsSidebar from "./TeamsSidebar";
import TeamDetail from "./TeamDetail";
import TeamsProyects from "./TeamsProyects";
import "../index.css";

const Teams = () => {
  const [dispTeam, setDispTeam] = useState(false);

  const displayT = () => {
    setDispTeam(true);
  };

  return (
    <div className='Teams'>
      <TeamsSidebar displayDetail={displayT} />
      {dispTeam === true && <TeamDetail />}
      <TeamsProyects />
    </div>
  );
};

export default Teams;
