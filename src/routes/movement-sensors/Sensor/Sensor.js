import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import s from './Sensor.css';

function Sensor({ dataHandler, index, sensor, isEdit }) {
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
  return (
    <Draggable
      bounds={options.bounds}
      onDrag={options.handleOnDrag}
      position={options.position}
    >
      <div className={s.Sensor} />
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
export default withStyles(s)(React.memo(Sensor));
