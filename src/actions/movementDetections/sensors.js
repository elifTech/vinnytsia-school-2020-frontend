import { UPDATE_SENSORS, DISARM } from '../../constants';

export function updateSensors(sensors) {
  return {
    type: UPDATE_SENSORS,
    sensors,
  };
}
export function disarmSensors() {
  return {
    type: DISARM,
  };
}
