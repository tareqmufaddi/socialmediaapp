import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createUnits } from "../../actions/units.js";
import PropTypes from "prop-types";

const AddUnit = ({ match, createUnits, history }) => {
  const [unitData, setUnitData] = useState({
    unit_id: "",
    landings: "",
    speed: "",
    capacity: "",
    project: `${match.params.projectname}`
  });

  const { unit_id, landings, speed, capacity, project } = unitData;

  const onChange = e =>
    setUnitData({ ...unitData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createUnits(unitData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add a Unit</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Please insert the following unit fields
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Unit ID"
            name="unit_id"
            value={unit_id}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Number of Stops"
            name="landings"
            value={landings}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Speed"
            name="speed"
            value={speed}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Capacity"
            name="capacity"
            value={capacity}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Project"
            name="project"
            value={match.params.projectname}
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

AddUnit.propTypes = {
  createUnits: PropTypes.func.isRequired
};

export default connect(null, { createUnits })(withRouter(AddUnit));
