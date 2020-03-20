import React, { memo } from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import classNames from 'classnames';
import map from 'lodash/map';
import s from './WindowSensors.css';
import windowData from './test-window-data.json';
import WindowSensor from './components/WindowSensor';

function WindowSensors(props) {
  useStyles(s);
  const { title } = props;

  // may be transferred to the server part
  const sortedWindowData = windowData.slice();
  sortedWindowData.sort((first, second) => {
    const status1 = first.status;
    const status2 = second.status;
    if (
      (status1 === 'hacked' || status1 === 'broken') &&
      status2 !== 'hacked' &&
      status2 !== 'broken'
    ) {
      return -1;
    }
    if (
      status1 !== 'hacked' &&
      status1 !== 'broken' &&
      (status2 === 'hacked' || status2 === 'broken')
    ) {
      return 1;
    }
    return 0;
  });

  const sensorItems = map(sortedWindowData, window => {
    return <WindowSensor key={window.id} windowSensorInfo={window} />;
  });
  return (
    <div className="container-fluid">
      <h2 className="text-center m-5">{title}</h2>
      <div
        className={classNames(
          'card-deck',
          'justify-content-center',
          s.cardDeck,
        )}
      >
        {sensorItems}
      </div>
    </div>
  );
}
WindowSensors.propTypes = {
  title: PropTypes.string.isRequired,
};

WindowSensors.whyDidYouRender = true;

export default memo(WindowSensors);
