import axios from "axios";
import { setAlert } from "./alert";

import { GET_UNITS, PROJECT_ERROR } from "./types";

export const getUnits = projectname => async dispatch => {
  try {
    const res = await axios.get(`api/unit/${projectname}`);

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
