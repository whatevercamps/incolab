import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import "../index.css";

const Home = (props) => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [editorChoiceProjects, setEditorChoiceProjects] = useState([]);

  return (
    <div className='Home container'>
      <div className='row featured-login'>
        <div className='col-md-12'>
          <div className='featured'>
            <h2 className='title'>Featured Projects</h2>
            {
              /*props.featuredProjects*/ [].forEach((project) => (
                <div className='col-md-3'>
                  <ProjectCard project={project} />
                </div>
              ))
            }
            <p className='text'>
              This section is under construction, wait for it soon!
            </p>
          </div>
        </div>
      </div>
      <div className='row related-choice'>
        <div className='col-8 '>
          <div className='related'>
            <h2 className='title'>Related Projects</h2>
            {
              /*props.relatedProjects*/ [].forEach((project) => (
                <div className='col-md-3'>
                  <ProjectCard project={project} />
                </div>
              ))
            }
            <p className='text'>
              This section is under construction, wait for it soon!
            </p>
          </div>
        </div>
        <div className='col-4'>
          <div className='editorChoice'>
            <h2 className='title'>Editors Choice</h2>
            {
              /*props.editorChoiceProjects*/ [].forEach((project) => (
                <div className='col-md-3'>
                  <ProjectCard project={project} />
                </div>
              ))
            }
            <p className='text'>
              This section is under construction, wait for it soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
