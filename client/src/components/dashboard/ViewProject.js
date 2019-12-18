import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUnits } from "../../actions/units";

const ViewProject = ({
  getUnits,
  auth: { user },
  project: { allUnits, loading },
  match
}) => {
  useEffect(() => {
    getUnits(match.params.projectname);
  }, [getUnits, match.params.projectname]);

  const projectUnits = allUnits.map(unit => (
    <tr key={unit.unit_id}>
      <td>{unit.unit_id}</td>
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
