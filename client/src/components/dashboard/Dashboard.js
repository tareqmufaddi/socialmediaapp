import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProject } from "../../actions/project";

//racfp
const Dashboard = ({
  getProject,
  auth: { user },
  project: { project, loading }
}) => {
  useEffect(() => {
    getProject();
  }, []);

  // if the project is null and it is still loading, we want to show to spinner/ else => <Fragment>...

  return loading && project === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"> Welcome {user && user.name} </i>
      </p>
      <Link to="/create-project" className="btn btn-primary my-1">
        Create Project
      </Link>
    </Fragment>
  );
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
