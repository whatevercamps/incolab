import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../index.css";

const TeamDetail = ({ teamId }) => {
  const [team, setTeam] = useState();

  useEffect(() => {
    console.log(teamId);
    if (teamId)
      fetch("/getTeam/" + teamId)
        .then((res) => res.json())
        .then((team) => setTeam(team));
  }, []);
  return team ? (
    <div className='TeamDetail'>
      <h1>{team.name}</h1>
      <h3>Description</h3>
      <p>{team.description}</p>
      <hr></hr>
      <h4>Tags</h4>
      {team.tags &&
        team.tags.length &&
        team.tags.map((tag) => <span>{tag}</span>)}
    </div>
  ) : (
    <p>Loading team ...</p>
  );
};

TeamDetail.prototypes = {
  teamId: PropTypes.string.isRequired,
};

export default TeamDetail;
