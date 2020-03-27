import React, { memo, useState, useCallback } from 'react';
import Draggeble from 'react-draggable';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import classNames from 'classnames';
import toUpper from 'lodash/toUpper';
import s from './WindowSensor.css';
import openCloseSensorIcon from '../Images/open-close-sensor.svg';
import breakSensorIcon from '../Images/break-sensor.svg';

const sensorOptions = new Map();
sensorOptions.set('ok', {
  sensorIconClass: s.iconOk,
  sensorInfoClass: 'bg-success',
});
sensorOptions.set('alarm', {
  sensorIconClass: s.iconAlert,
  sensorInfoClass: 'bg-danger',
});
sensorOptions.set('warning', {
  sensorIconClass: s.iconWarning,
  sensorInfoClass: 'bg-warning',
});
sensorOptions.set('inactive', {
  sensorIconClass: s.iconInactive,
  sensorInfoClass: 'bg-light',
});

function WindowSensor(props) {
  useStyles(s);
  const { sensorData, isEditingMode } = props;
  const [hover, setHover] = useState(false);

  const options = { ...sensorOptions.get(sensorData.status) };
  options.position = {
    x: sensorData.xCoord || 0,
    y: sensorData.yCoord || 0,
  };
  if (sensorData.type === 'open/close') {
    options.sensorIcon = openCloseSensorIcon;
  } else {
    options.sensorIcon = breakSensorIcon;
  }

  const toggleHoverHandler = useCallback(() => {
    setHover(!hover);
  }, [hover]);

  return (
    <Draggeble
      bounds="parent"
      disabled={!isEditingMode}
      position={options.position}
    >
      <div
        className={s.sensorBadge}
        onMouseEnter={toggleHoverHandler}
        onMouseLeave={toggleHoverHandler}
      >
        <img
          alt="sensor icon"
          className={classNames(s.sensorIcon, options.sensorIconClass)}
          src={options.sensorIcon}
        />
        {hover && !isEditingMode && (
          <div
            className={classNames(
              'card',
              options.sensorInfoClass,
              s.sensorInfo,
            )}
          >
            <div className="card-header">{`${sensorData.type} sensor on ${sensorData.window.name}`}</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                {`Status:  `}
                <span className={options.sensorInfoClass}>
                  {toUpper(sensorData.status)}
                </span>
                {sensorData.msg && <p className="m-0">{sensorData.msg}</p>}
              </li>
              {sensorData.lastAlartDate && (
                <li className="list-group-item">{`Last alart date: ${sensorData.lastAlartDate}`}</li>
              )}
              <li className="list-group-item">{`Zone: ${sensorData.window.zone.name}`}</li>
              <li className="list-group-item">{`Battery capasity: ${sensorData.batteryCharge}%`}</li>
            </ul>
          </div>
        )}
      </div>
    </Draggeble>
  );
}
WindowSensor.propTypes = {
  isEditingMode: PropTypes.bool.isRequired,
  sensorData: PropTypes.shape({
    batteryCharge: PropTypes.number,
    id: PropTypes.number,
    isActive: PropTypes.bool,
    isOpen: PropTypes.bool,
    lastAlartDate: PropTypes.string,
    msg: PropTypes.string,
    sensorId: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string,
    window: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      zone: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
    xCoord: PropTypes.number,
    yCoord: PropTypes.number,
  }).isRequired,
};
WindowSensor.whyDidYouRender = true;
export default memo(WindowSensor);
