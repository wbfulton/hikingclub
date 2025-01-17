import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// Creates an Alert, Type depends on what is sent in
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  // removes alert after 5 seconds
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
