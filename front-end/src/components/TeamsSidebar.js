import React from "react";
import "../index.css";

const TeamsSidebar = () => (
  <div className='TeamsSidebar'>
    <div className='teamsList'>
      <h3>My Teams</h3>
      <ul>
        <li>Team 1</li>
        <li>Team 2</li>
        <li>Team 3</li>
      </ul>
      <div className='createButton'>
        <button className='btn'>Create a new Team</button>
      </div>
      <hr></hr>
    </div>
  </div>
);

export default TeamsSidebar;
