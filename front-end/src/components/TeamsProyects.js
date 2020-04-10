import React from "react";
import "../index.css";

const TeamsProyects = () => (
  <div className='TeamsProyects'>
    <h1>My Proyects</h1>
    <p>Here's a list of all your current proyects in this team</p>
    <div className='createButton'>
      <button className='btn'>Create a new Proyect</button>
    </div>
    <ul>
      <li>Proyect 1</li>
      <li>Proyect 2</li>
      <li>Proyect 3</li>
    </ul>
  </div>
);

export default TeamsProyects;
