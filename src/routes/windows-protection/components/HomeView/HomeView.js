import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import property from 'lodash/property';
import map from 'lodash/map';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './HomeView.css';
import HousePlanImg from './Images/house-plan.png';
import ViewWindowSensor from './WindowSensor';

import { fetchWindowSensors } from '../../../../actions/window-sensors';

function HomeView(props) {
  useStyles(s);
  const { title } = props;
  const dispatch = useDispatch();
  const windowSensorsData = useSelector(
    property('wSensors.fetchedWindowSensors'),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(fetchWindowSensors());
  }, [dispatch]);

  const windowSensors = map(windowSensorsData, sensor => {
    return (
      <ViewWindowSensor
        key={sensor.id}
        isEditingMode={false}
        sensorData={sensor}
      />
    );
  });

  return (
    <div>
      <h2 className={classNames('text-center', 'mb-4')}>{title}</h2>
      <div className={classNames(s.homeView)}>
        <div className={s.planContainer}>
          {windowSensors}
          <img alt="house plan" className={s.housePlanImg} src={HousePlanImg} />
        </div>
      </div>
    </div>
  );
}
HomeView.propTypes = {
  title: PropTypes.string.isRequired,
};
HomeView.whyDidYouRender = true;
export default memo(HomeView);
