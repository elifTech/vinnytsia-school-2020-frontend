import React, { useState, useCallback } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import s from './ContextMenu.css';

function ContextMenu({
  deleteSensorHandler,
  index,
  sensor,
  updateLocationHandler,
  isEdit,
  isDisarmed,
}) {
  useStyles(s);
  const [sensorLocation, setSensorLocation] = useState(sensor.location);

  const deleteHandler = useCallback(() => {
    deleteSensorHandler(index);
  }, [index, deleteSensorHandler]);

  const inputHandler = useCallback(event => {
    setSensorLocation(event.target.value);
  }, []);
  const saveLocationHandler = useCallback(() => {
    updateLocationHandler(index, sensorLocation);
  }, [updateLocationHandler, index, sensorLocation]);
  return (
    <div className={s.ContextMenu}>
      {isEdit ? (
        <>
          <label className={s.locationTitle} htmlFor="location">
            Location
            <input
              className={s.location}
              id="location"
              onChange={inputHandler}
              type="text"
              value={sensorLocation}
            />
          </label>
          <button
            className="btn btn-success"
            onClick={saveLocationHandler}
            type="button"
          >
            Save
          </button>
          <button
            className="btn btn-danger"
            onClick={deleteHandler}
            type="button"
          >
            Delete sensor
          </button>
        </>
      ) : (
        <>
          <p className={s.title}>Sensor №{index + 1}</p>
          <p>Location: {sensor.location || 'not specified'}</p>
          <p>
            Security:&nbsp;
            <span
              className={classNames('badge', {
                'badge-success': !isDisarmed,
                'badge-warning': isDisarmed,
              })}
            >
              {isDisarmed ? 'OFFLINE' : 'ONLINE'}
            </span>
          </p>
          <p>
            Status:&nbsp;
            <span
              className={classNames('badge', {
                'badge-success': !sensor.alert,
                'badge-danger': sensor.alert,
              })}
            >
              {sensor.alert ? 'ALERT' : 'OK'}
            </span>
          </p>
          <p>Last alert: {sensor.lastAlert ? sensor.lastAlert : 'none'}</p>
        </>
      )}
    </div>
  );
}

ContextMenu.propTypes = {
  deleteSensorHandler: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDisarmed: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  sensor: PropTypes.shape({
    alert: PropTypes.bool,
    lastAlert: PropTypes.string,
    location: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  updateLocationHandler: PropTypes.func.isRequired,
};

export default React.memo(ContextMenu);
