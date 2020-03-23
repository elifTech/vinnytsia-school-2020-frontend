import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import classNames from 'classnames';
import map from 'lodash/map';
import property from 'lodash/property';
import s from './WindowSensors.css';
import WindowSensor from './components/WindowSensor';
import fetchWindowSensorData from '../../actions/window-sensors';

function WindowSensors(props) {
  useStyles(s);
  const { title } = props;
  const dispatch = useDispatch();
  const sortedWindowData = useSelector(
    property('wSensors.fetchedWindowData'),
    shallowEqual,
  );
  const isLoading = useSelector(property('wSensors.isLoading'), shallowEqual);
  useEffect(() => {
    dispatch(fetchWindowSensorData());
  }, [dispatch]);

  const sensorItems = map(sortedWindowData, window => {
    return <WindowSensor key={window.id} windowSensorInfo={window} />;
  });
  return (
    <div className="container-fluid">
      <h2 className="text-center m-5">{title}</h2>
      {isLoading && <h1>LOADING</h1>}
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
