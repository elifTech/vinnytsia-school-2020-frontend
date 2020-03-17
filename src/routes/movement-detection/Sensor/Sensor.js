import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import s from './Sensor.css';
import sensorIMG from '../assets/sensor.svg';

function Sensor({ dataHandler, index, sensor, isEdit }) {
  const [hover, setHover] = useState(false);
  const options = {
    position: sensor,
  };
  const limit = 25;
  if (isEdit) {
    options.handleOnDrag = (event, ui) => dataHandler(event, ui, index);
  } else {
    options.bounds = {
      top: sensor.y - limit,
      left: sensor.x - limit,
      right: sensor.x + limit,
      bottom: sensor.y + limit,
    };
  }
  function hoverHandler() {
    setHover(!hover);
  }
  const content =
    hover && !isEdit ? (
      <>
        <p className={s.title}>Sensor №{index + 1}</p>
        <p>
          Status: <span className="badge badge-success">OK</span>
        </p>
        <p>Last alert: none</p>
      </>
    ) : (
      <img alt="sensor" src={sensorIMG} />
    );
  const classes =
    hover && !isEdit ? classNames(s.Sensor, s.SensorInfo) : s.Sensor;
  return (
    <Draggable
      bounds={options.bounds}
      onDrag={options.handleOnDrag}
      position={options.position}
    >
      <div
        className={classes}
        onMouseEnter={hoverHandler}
        onMouseLeave={hoverHandler}
      >
        {content}
      </div>
    </Draggable>
  );
}
Sensor.propTypes = {
  dataHandler: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isEdit: PropTypes.bool.isRequired,
  sensor: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
};

Sensor.whyDidYouRender = true;
export default withStyles(s)(React.memo(Sensor));
