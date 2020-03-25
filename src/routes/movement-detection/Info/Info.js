import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import reduce from 'lodash/reduce';
import s from './Info.css';

function Info({ isDisarmed, sensors }) {
  const sensorsCount = sensors.length;
  const sensorsOnline = isDisarmed
    ? 0
    : reduce(sensors, (sum, sensor) => (sensor.isDisarmed ? sum : sum + 1), 0);
  const sensorsOffline = sensorsCount - sensorsOnline;
  return (
    <div className={s.Info}>
      <h2 className={s.InfoTitle}>Information:</h2>
      <div className={s.InfoContent}>
        <p>
          System status: <strong>{isDisarmed ? 'Offline' : 'Online'}</strong>
        </p>
        <p>Sensors count: {sensorsCount}</p>
        <p>Sensors online: {sensorsOnline}</p>
        <p>Sensors offline: {sensorsOffline}</p>
        <p>Last alert: none </p>
        <p>All alerts: </p>
      </div>
    </div>
  );
}

Info.propTypes = {
  isDisarmed: PropTypes.bool.isRequired,
  sensors: PropTypes.instanceOf(Array).isRequired,
};

export default withStyles(s)(React.memo(Info));
