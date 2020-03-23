// import fetch from 'node-fetch';
import testWindowData from '../routes/window-sensors/test-window-data.json';
import {
  FETCH_DATA_START,
  FETCH_DATA_FAILURE,
  FETCH_WINDOW_DATA_SUCCESS,
} from '../constants';

function fetchDataStart() {
  return {
    type: FETCH_DATA_START,
  };
}
function fetchDataFailure(error) {
  return {
    type: FETCH_DATA_FAILURE,
    error,
  };
}
function fetchWindowDataSuccess(fetchedWindowData) {
  return {
    type: FETCH_WINDOW_DATA_SUCCESS,
    fetchedWindowData,
  };
}

export default function fetchWindowSensorData() {
  return dispatch => {
    dispatch(fetchDataStart());
    try {
      // will be transferred to the server part
      testWindowData.sort((first, second) => {
        const status1 = first.status;
        const status2 = second.status;
        if (
          (status1 === 'hacked' || status1 === 'broken') &&
          status2 !== 'hacked' &&
          status2 !== 'broken'
        ) {
          return -1;
        }
        if (
          status1 !== 'hacked' &&
          status1 !== 'broken' &&
          (status2 === 'hacked' || status2 === 'broken')
        ) {
          return 1;
        }
        return 0;
      });

      return dispatch(fetchWindowDataSuccess(testWindowData));
    } catch (error) {
      return dispatch(fetchDataFailure(error));
    }
  };
}
