import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import s from './Sensor.css';
import sensorPicture from '../assets/sensor.svg';
import ContextMenu from './ContextMenu/ContextMenu';

function Sensor({
  positionHandler,
  deleteSensorHandler,
  index,
  isDisarmed,
  sensor,
  isEdit,
  updateLocationHandler,
}) {
  const [hover, setHover] = useState(false);
  const [contextMenuShow, setContextMenuShow] = useState(false);
  const limit = 25;
  const options = {
    position: sensor,
  };

  if (isEdit) {
    options.handleOnDrag = (event, ui) => positionHandler(ui, index);
    options.bounds = 'parent';
  } else {
    options.bounds = {
      top: sensor.y - limit,
      left: sensor.x - limit,
      right: sensor.x + limit,
      bottom: sensor.y + limit,
    };
  }

  const content = contextMenuShow ? (
    <ContextMenu
      deleteSensorHandler={deleteSensorHandler}
      index={index}
      isDisarmed={isDisarmed}
      isEdit={isEdit}
      sensor={sensor}
      updateLocationHandler={updateLocationHandler}
    />
  ) : (
    <img
      alt="sensor"
      className={classNames(s.SensorImg, {
        [s.SensorImg_disabled]: isDisarmed,
        [s.SensorImg_alert]: false,
      })}
      src={sensorPicture}
    />
  );

  function hoverHandler() {
    setHover(!hover);
    setContextMenuShow(false);
  }
  function contextMenuHandler(event) {
    event.preventDefault();
    setContextMenuShow(true);
  }

  return (
    <Draggable
      bounds={options.bounds}
      disabled={contextMenuShow}
      onStop={options.handleOnDrag}
      position={options.position}
    >
      <div
        className={classNames(s.Sensor, {
          [s.Sensor_waves]: !isEdit && !contextMenuShow,
          [s.Alert]: sensor.alert && !isDisarmed,
          [s.Normal]: !sensor.alert && !isDisarmed,
        })}
        disabled={contextMenuShow}
        onContextMenu={contextMenuHandler}
        onMouseEnter={hoverHandler}
        onMouseLeave={hoverHandler}
      >
        {content}
      </div>
    </Draggable>
  );
}

Sensor.propTypes = {
  deleteSensorHandler: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDisarmed: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  positionHandler: PropTypes.func.isRequired,
  sensor: PropTypes.shape({
    alert: PropTypes.bool,
    lastAlert: PropTypes.string,
    location: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  updateLocationHandler: PropTypes.func.isRequired,
};

Sensor.whyDidYouRender = true;
export default withStyles(s)(React.memo(Sensor));
