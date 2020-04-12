import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Login from "./Login";
import ProjectCard from "./ProjectCard";
import "../index.css";

const Home = (props) => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [editorChoiceProjects, setEditorChoiceProjects] = useState([]);

  // useEffect(() => {

  // }, [])

  return (
    <div className='Home container'>
      <div className='row featured'>
        <div className='col-md-3'>
          <Login />
        </div>
        {
          /*props.featuredProjects*/ [].forEach((project) => (
            <div className='col-md-3'>
              <ProjectCard project={project} />
            </div>
          ))
        }
      </div>
      <div className='row related'>
        {
          /*props.relatedProjects*/ [].forEach((project) => (
            <div className='col-md-3'>
              <ProjectCard project={project} />
            </div>
          ))
        }
      </div>
      <div className='row editorChoice'>
        {
          /*props.editorChoiceProjects*/ [].forEach((project) => (
            <div className='col-md-3'>
              <ProjectCard project={project} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Home;
