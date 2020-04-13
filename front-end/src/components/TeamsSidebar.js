import React, { useState, useEffect } from "react";
import "../index.css";

const TeamsSidebar = ({ changeTeamId }) => {
  const [clickForm, setClickForm] = useState(false);
  const [teams, setTeams] = useState([]);

  const displayCreateForm = () => {
    setClickForm(true);
    if (clickForm === true) {
      setClickForm(false);
    }
  };

  useEffect(() => {
    fetch("/getAuthTeams")
      .then((res) => res.json())
      .then((teams) => setTeams(teams));
  }, []);

  return (
    <div className='TeamsSidebar'>
      <div className='teamsList'>
        <h3>My Teams</h3>
        <ul>
          {teams.length === 0 ? (
            <p>Loading teams ...</p>
          ) : (
            teams.map((team, i) => (
              <li key={"teams" + i}>
                <button
                  className='teamBut'
                  onClick={() => changeTeamId(team._id)}
                >
                  {team.name}
                </button>
              </li>
            ))
          )}
        </ul>
        <div className='createButton'>
          <button className='btn' onClick={displayCreateForm}>
            Create a new Team
          </button>
        </div>
        {clickForm === true && (
          <form action='/createTeam' method='post' className='createForm'>
            <div className='form-group'>
              <label>Name</label>
              <input
                type='text'
                className='form-control'
                id='exampleInputName'
                placeholder='Enter a name'
              />
            </div>
            <div className='form-group'>
              <label>Description</label>
              <textarea
                type='text'
                className='form-control'
                id='exampleInputDescription'
                placeholder='Write a description of your team'
              />
            </div>
            <div className='form-group'>
              <label>Tags</label>
              <input
                type='text'
                className='form-control'
                id='exampleInputTags'
                placeholder='Enter some tags (,)'
              />
            </div>
            <div className='but'>
              <button type='submit' className='btn btn-primary'>
                CREATE
              </button>
            </div>
          </form>
        )}
        <hr></hr>
      </div>
    </div>
  );
};
export default TeamsSidebar;
