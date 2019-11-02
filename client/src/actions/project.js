import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROJECT, PROJECT_ERROR } from "./types";

// Get project
export const getProject = () => async dispatch => {
  try {
    const res = await axios.get("api/project/");
  } catch (err) {}
};
