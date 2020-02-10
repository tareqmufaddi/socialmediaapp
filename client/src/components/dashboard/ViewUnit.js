import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { getSubmittals } from "../../actions/submittals";

const ViewUnit = ({ getSubmittals, project: { allSubmittals }, match }) => {
  useEffect(() => {
    getSubmittals(match.params.unit_id);
  }, [getSubmittals, match.params.unit_id]);

  const unitSubmittals = allSubmittals.map(submittal => (
    <tr key={submittal.doc_id}>
      <td>{submittal.doc_id}</td>
      <td>{submittal.rev}</td>
      <td>
        <Moment format="YYYY/MM/DD">{submittal.submitted}</Moment>
      </td>
      <td>
        <Moment format="YYYY/MM/DD">{submittal.received}</Moment>
      </td>
      <td>{submittal.closed.toString()}</td>
      <td>{submittal.superceded.toString()}</td>
      <td>{submittal.sender}</td>
      <td>{submittal.receiver}</td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Submittals</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Doc ID</th>
            <th>Rev</th>
            <th>Submitted</th>
            <th>Received</th>
            <th>Closed</th>
            <th>Superceded</th>
            <th>Sender</th>
            <th>Receiver</th>
          </tr>
        </thead>
        <tbody>{unitSubmittals}</tbody>
      </table>
    </Fragment>
  );
};

ViewUnit.propTypes = {
  getSubmittals: PropTypes.func.isRequired,
  allSubmittals: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(mapStateToProps, { getSubmittals })(ViewUnit);
