import axios from "axios";

import { GET_SUBMITTALS, PROJECT_ERROR } from "./types";

export const getSubmittals = unit_id => async dispatch => {
  try {
    const res = await axios.get(`/api/submittal/unit/${unit_id}`);
    dispatch({
      type: GET_SUBMITTALS,
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
