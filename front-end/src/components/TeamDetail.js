import React, { useEffect, useState } from "react";
import "../index.css";

const TeamDetail = () => {
  const [team, setTeam] = useState();

  useEffect((id) => {
    fetch("/teams/getTeam/" + id)
      .then((res) => res.json())
      .then((team) => setTeam(team));
  }, []);
  return (
    <div className='TeamDetail'>
      <h1>{team.name}</h1>
      <h3>{team.description}</h3>
      <p>
        Lorem nostrud irure eiusmod et pariatur dolore deserunt incididunt velit
        ex in do elit incididunt. Ex duis adipisicing aute officia irure mollit
        deserunt. Ullamco ullamco amet est laborum eiusmod ex ullamco duis ad.
        Ut id pariatur sunt pariatur nisi esse. Magna voluptate esse aliqua
        pariatur elit sit ea dolore nulla labore et.
      </p>
      <h3>Milestones</h3>
      <div className='container milestones'>
        <div className='row'>
          <div className='col-md-12'>
            <ul className='timeline'>
              <li>
                <a>New Web Design</a>
                <a className='float-right'>21 March, 2014</a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque scelerisque diam non nisi semper, et elementum lorem
                  ornare. Maecenas placerat facilisis mollis. Duis sagittis
                  ligula in sodales vehicula....
                </p>
              </li>
              <li>
                <a>21 000 Job Seekers</a>
                <a className='float-right'>4 March, 2014</a>
                <p>
                  Curabitur purus sem, malesuada eu luctus eget, suscipit sed
                  turpis. Nam pellentesque felis vitae justo accumsan, sed
                  semper nisi sollicitudin...
                </p>
              </li>
              <li className='lastLi'>
                <a>Awesome Employers</a>
                <a className='float-right'>1 April, 2014</a>
                <p>
                  Fusce ullamcorper ligula sit amet quam accumsan aliquet. Sed
                  nulla odio, tincidunt vitae nunc vitae, mollis pharetra velit.
                  Sed nec tempor nibh...
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <br></br>
      <hr></hr>
      <h4>Tags</h4>
      <span>{team.tags[0]}</span>
      <span>Node JS</span>
      <span>Javascript</span>
      <span>Innovation</span>
      <span>Covid-19</span>
    </div>
  );
};

export default TeamDetail;
