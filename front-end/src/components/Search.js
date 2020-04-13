import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import "../index.css";

const Home = ({ search }) => {
  const [results, setResults] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");
  useEffect(() => {
    if (currentSearch != search) {
      console.log("buscando", search);
      const query = search.join(",");
      fetch(`/projects?query=${query}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          if (data && data.projects)
            setResults(() => results.concat(data.projects));
          console.log("results", results);
        });
      setCurrentSearch(search);
    }
  });

  return results && results.length ? (
    <div className='container'>
      {results.map((res, index) => {
        return <ProjectCard key={"search-result-" + index} project={res} />;
      })}
    </div>
  ) : (
    <h1>Loading results...</h1>
  );
};

export default Home;
