import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROJECT, PROJECT_ERROR } from "./types";

// Get project
export const getProject = () => async dispatch => {
  try {
    const res = await axios.get("api/project/");

    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Create a project

export const createProject = (
  projectData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/project", projectData, config);

    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
    dispatch(setAlert("Project Created", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROJECT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
