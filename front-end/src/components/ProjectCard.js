import React, { useState } from "react";
import PropTypes from "prop-types";

import "../index.css";

const ProjectCard = ({ project }) => {
  return (
    <div className='ProjectCard'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{project && project.name}</h5>
          <h6 className='card-subtitle mb-2 text-muted'>
            {project &&
              project.tags &&
              project.tags.map((tag, index) => (
                <span key={"tag-" + index}>- {tag} -</span>
              ))}
          </h6>
          <p className='card-text'>{project && project.description}</p>
          <a href='#' className='card-link'>
            See more...
          </a>
        </div>
      </div>
    </div>
  );
};

ProjectCard.prototypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectCard;
