import React, { useState } from "react";
import PropTypes from "prop-types";

import "../index.css";

const ProjectCard = (props) => {
  return (
    <div className='ProjectCard'>
      <div className='card'>
        <div className='col-md-3'></div>
      </div>
    </div>
  );
};

ProjectCard.prototypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectCard;
