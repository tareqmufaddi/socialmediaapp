import axios from "axios";
import { setAlert } from "./alert";

import { GET_UNITS, ADD_UNIT, PROJECT_ERROR } from "./types";

export const getUnits = projectname => async dispatch => {
  try {
    const res = await axios.get(`/api/unit/${projectname}`);

    dispatch({
      type: GET_UNITS,
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

export const createUnits = (
  unitData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(
      `/api/unit/${unitData.project}`,
      unitData,
      config
    );

    dispatch({
      type: ADD_UNIT,
      payload: res.data
    });
    dispatch(setAlert("Unit Added", "success"));
    history.push(`/${unitData.project}`);
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
