import React, { useState, useEffect, useRef } from "react";
import "../index.css";

const TeamsSidebar = ({ changeTeamId }) => {
  const [clickForm, setClickForm] = useState(false);
  const [teams, setTeams] = useState([]);
  const formRef = useRef();

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

  const onClick = (evt) => {
    evt.preventDefault();
    const formData = new FormData(formRef.current);
    const tags = formData.get("tags");
    const tagsList = tags.split(",");
    const name = formData.get("name");
    const description = formData.get("description");
    const data = { name: name, description: description, tags: tagsList };

    fetch("/createTeam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
          <form
            onSubmit={(evt) => onClick(evt)}
            className='createForm'
            ref={formRef}
          >
            <div className='form-group'>
              <label>Name</label>
              <input
                type='text'
                className='form-control'
                id='exampleInputName'
                placeholder='Enter a name'
                name='name'
              />
            </div>
            <div className='form-group'>
              <label>Description</label>
              <textarea
                type='text'
                className='form-control'
                id='exampleInputDescription'
                placeholder='Write a description of your team'
                name='description'
              />
            </div>
            <div className='form-group'>
              <label>Tags</label>
              <input
                type='text'
                className='form-control'
                id='exampleInputTags'
                placeholder='Enter some tags (,)'
                name='tags'
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
