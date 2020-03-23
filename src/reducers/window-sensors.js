import {
  FETCH_DATA_START,
  FETCH_DATA_FAILURE,
  FETCH_WINDOW_DATA_SUCCESS,
} from '../constants';

export default function wSensors(state = { fetchedWindowData: [] }, action) {
  switch (action.type) {
    case FETCH_DATA_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case FETCH_WINDOW_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        fetchedWindowData: action.fetchedWindowData,
      };
    default:
      return state;
  }
}
