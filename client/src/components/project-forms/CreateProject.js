import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/project";

const CreateProject = ({ createProject, history }) => {
  const [projectData, setProjectData] = useState({
    name: "",
    numberofunits: "",
    location: "",
    client: "",
    contractor: "",
    projectmanager: "",
    engineer: ""
  });

  const {
    name,
    numberofunits,
    location,
    client,
    contractor,
    projectmanager,
    engineer
  } = projectData;

  const onChange = e =>
    setProjectData({ ...projectData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProject(projectData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create a new project</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Please insert the following project
        fields
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Project Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Number of Units"
            name="numberofunits"
            value={numberofunits}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Client"
            name="client"
            value={client}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Contractor"
            name="contractor"
            value={contractor}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Project Manager"
            name="projectmanager"
            value={projectmanager}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Supervising Engineer"
            name="engineer"
            value={engineer}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="../dashboard">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

CreateProject.propTypes = {
  createProject: PropTypes.func.isRequired
};

export default connect(null, { createProject })(withRouter(CreateProject));
