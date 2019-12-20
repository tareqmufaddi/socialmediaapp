import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Projects = ({ allProjects }) => {
  const compprojects = allProjects.map(proj => (
    <tr key={proj.name}>
      <td>
        <Link to={`${proj.name}`}>{proj.name}</Link>
      </td>
      <td>{proj.numberofunits}</td>
      <td>{proj.location}</td>
      <td>{proj.client}</td>
      <td>{proj.contractor}</td>
      <td>{proj.projectmanager}</td>
      <td>{proj.engineer}</td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Existing Projects</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Number of Units</th>
            <th>Location</th>
            <th>Client Name</th>
            <th>Contractor</th>
            <th>Project Manager</th>
            <th>Supervising Engineer</th>
          </tr>
        </thead>
        <tbody>{compprojects}</tbody>
      </table>
    </Fragment>
  );
};

Projects.propTypes = {
  allProjects: PropTypes.array.isRequired
};

export default Projects;
