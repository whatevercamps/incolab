import React, { useState } from "react";
import "../index.css";

const TeamsProyects = ({ teamId, userId }) => {
  // const [projects, setProjects] = useState(null);
  const [clickForm, setClickForm] = useState(false);

  // useEffect(() => {
  //   if (teamId && userId)
  //     fetch("/getProjectsTeams")
  //       .then((res) => res.json())
  //       .then((data) => (data.team._id = teamId))
  //       .then((projects) => setProjects(projects));
  // }, []);

  const displayCreateForm = () => {
    setClickForm(true);
    if (clickForm === true) {
      setClickForm(false);
    }
  };

  return (
    <div className='TeamsProyects'>
      <h1>My Proyects</h1>
      <p>Here's a list of all your current proyects in this team</p>
      <div className='createButton'>
        <button className='btn' onClick={displayCreateForm}>
          Create a new Proyect
        </button>
      </div>
      {clickForm === true && (
        <form action='/createProjectTeam' method='post' className='createForm'>
          <div className='form-group'>
            <label htmlFor='exampleInputName'>Name</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputName'
              placeholder='Enter a name'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>Description</label>
            <textarea
              type='text'
              className='form-control'
              id='exampleInputDescription'
              placeholder='Write a description of your project'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>Links</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputDescription'
              placeholder='Type some links for adding information of your projects'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>Milestones</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputDescription'
              placeholder='Fill the milestones for your project (,)'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputTags'>Tags</label>
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
      <ul>
        {/* {projects.length === 0 ? (
          <p>Loading projects ...</p>
        ) : (
          projects.map((p, i) => <li key={"project" + i}>{p.name}</li>)
        )} */}
      </ul>
    </div>
  );
};

export default TeamsProyects;
