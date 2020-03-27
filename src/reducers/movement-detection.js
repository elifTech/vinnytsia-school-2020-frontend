import { ADD_IMG_URL, UPDATE_SENSORS, DISARM } from '../constants';

const initialState = {
  imgUrl: '',
  sensors: [],
  isDisarmed: false,
};

export default function movementDetection(state = initialState, action) {
  switch (action.type) {
    case ADD_IMG_URL:
      return {
        ...state,
        imgUrl: action.imgUrl,
      };
    case UPDATE_SENSORS:
      return {
        ...state,
        sensors: action.sensors,
      };
    case DISARM:
      return {
        ...state,
        isDisarmed: !state.isDisarmed,
      };
    default:
      return state;
  }
}
