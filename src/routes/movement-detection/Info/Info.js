import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import sumBy from 'lodash/sumBy';
import s from './Info.css';

function Info({ isDisarmed, sensors }) {
  useStyles(s);
  const sensorsCount = sensors.length;
  const sensorsOnline = useMemo(
    () =>
      isDisarmed ? 0 : sumBy(sensors, sensor => (sensor.isDisarmed ? 0 : 1)),
    [isDisarmed, sensors],
  );
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
  sensors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default React.memo(Info);
