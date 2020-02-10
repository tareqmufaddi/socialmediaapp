import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUnits } from "../../actions/units";

const ViewProject = ({ getUnits, project: { allUnits, loading }, match }) => {
  useEffect(() => {
    getUnits(match.params.projectname);
  }, [getUnits, match.params.projectname]);

  const projectUnits = allUnits.map(unit => (
    <tr key={unit.unit_id}>
      <td>
        <Link to={`/project/${unit.unit_id}`}>{unit.unit_id}</Link>
      </td>
      <td>{unit.landings}</td>
      <td>{unit.speed}</td>
      <td>{unit.capacity}</td>
      <td>{unit.project}</td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Units</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Unit ID</th>
            <th>Stops</th>
            <th>Speed</th>
            <th>Capacity</th>
            <th>Project</th>
          </tr>
        </thead>
        <tbody>{projectUnits}</tbody>
      </table>
      <Link
        to={`/forms/${match.params.projectname}`}
        className="btn btn-primary my-1"
      >
        Add Unit
      </Link>
    </Fragment>
  );
};

ViewProject.propTypes = {
  getUnits: PropTypes.func.isRequired,
  allUnits: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
});

export default connect(mapStateToProps, { getUnits })(ViewProject);
