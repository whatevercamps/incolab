import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Login from "./Login";
import ProjectCard from "./ProjectCard";
import "../index.css";

const Home = ({ search }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log("buscando", search);
    fetch("/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.projects)
          setResults(() => results.concat(data.projects));
      });
  }, []);

  return results && results.length ? (
    <div className='container'>
      {results.map((res) => (
        <span>{res} </span>
      ))}
    </div>
  ) : (
    <h1>Loading results...</h1>
  );
};

export default Home;
