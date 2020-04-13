import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Login from "./Login";
import ProjectCard from "./ProjectCard";
import "../index.css";

const Home = (props) => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [editorChoiceProjects, setEditorChoiceProjects] = useState([]);

  return (
    <div className='Home container'>
      <div className='row'>
        <h1>Welcome to INcolab, start innovating, creating and helping!</h1>
      </div>
      <div className='row featured-login'>
        <div className='col-md-8 featured'>
          <h2 className='title'>Featured Projects</h2>
          {
            /*props.featuredProjects*/ [].forEach((project) => (
              <div className='col-md-3'>
                <ProjectCard project={project} />
              </div>
            ))
          }
          <p className='text'>
            Aliquip irure duis commodo id voluptate qui consectetur officia
            cupidatat velit tempor. Sit esse officia commodo Lorem eiusmod minim
            veniam eu veniam ut. Eiusmod voluptate amet voluptate ipsum magna
            tempor veniam enim commodo cillum. Aliqua veniam labore sint ea. In
            culpa consequat excepteur in fugiat pariatur sunt aliquip eu cillum
            et enim sunt.
          </p>
        </div>
        <div className='col-md-4 login'>
          <Login />
        </div>
      </div>
      <div className='row related-choice'>
        <div className='col-md-8 related'>
          <h2 className='title'>Related Projects</h2>
          {
            /*props.relatedProjects*/ [].forEach((project) => (
              <div className='col-md-3'>
                <ProjectCard project={project} />
              </div>
            ))
          }
          <p className='text'>
            Aliquip irure duis commodo id voluptate qui consectetur officia
            cupidatat velit tempor. Sit esse officia commodo Lorem eiusmod minim
            veniam eu veniam ut. Eiusmod voluptate amet voluptate ipsum magna
            tempor veniam enim commodo cillum. Aliqua veniam labore sint ea. In
            culpa consequat excepteur in fugiat pariatur sunt aliquip eu cillum
            et enim sunt.
          </p>
        </div>
        <div className='col-md-4 editorChoice'>
          <h2 className='title'>Editors Choice</h2>
          {
            /*props.editorChoiceProjects*/ [].forEach((project) => (
              <div className='col-md-3'>
                <ProjectCard project={project} />
              </div>
            ))
          }
          <p className='text'>
            Aliquip irure duis commodo id voluptate qui consectetur officia
            cupidatat velit tempor. Sit esse officia commodo Lorem eiusmod minim
            veniam eu veniam ut. Eiusmod voluptate amet voluptate ipsum magna
            tempor veniam enim commodo cillum. Aliqua veniam labore sint ea. In
            culpa consequat excepteur in fugiat pariatur sunt aliquip eu cillum
            et enim sunt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
