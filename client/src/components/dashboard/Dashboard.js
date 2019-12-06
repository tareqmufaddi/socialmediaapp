import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProject } from "../../actions/project";

//racfp
const Dashboard = ({ getProject, auth, project }) => {
  useEffect(() => {
    getProject();
  }, []);

  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  getProject: PropTypes.func.isRequired, //ptfr
  auth: PropTypes.object.isRequired, //ptor
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  project: state.project
});

export default connect(mapStateToProps, { getProject })(Dashboard);
