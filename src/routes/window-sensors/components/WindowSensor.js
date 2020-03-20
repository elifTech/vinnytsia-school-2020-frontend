import React, { memo } from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import classNames from 'classnames';
import s from './WindowSensor.css';
import windowOpenIcon from './Icons/w-open.png';
import windowClosedIcon from './Icons/w-closed.png';
import windowBrokenIcon from './Icons/w-broken.png';
import windowInactiveIcon from './Icons/w-inactive.png';

// const MIN_BATTERY_CAPACITY = 10;

function WindowSensor(props) {
  useStyles(s);
  const { windowSensorInfo } = props;
  let windowStatusInfo;
  switch (windowSensorInfo.status) {
    case 'closed': {
      windowStatusInfo = {
        windowIcon: windowClosedIcon,
        cardBodyClass: '',
        accidentDate: null,
      };
      break;
    }
    case 'open': {
      windowStatusInfo = {
        windowIcon: windowOpenIcon,
        cardBodyClass: 'text-success',
        accidentDate: null,
      };
      break;
    }
    case 'broken': {
      windowStatusInfo = {
        windowIcon: windowBrokenIcon,
        cardBodyClass: 'text-danger',
        accidentDate: windowSensorInfo.brokenTime,
      };
      break;
    }
    case 'hacked': {
      windowStatusInfo = {
        windowIcon: windowBrokenIcon,
        cardBodyClass: 'text-danger',
        accidentDate: windowSensorInfo.hackedTime,
      };
      break;
    }
    case 'inactive': {
      windowStatusInfo = {
        windowIcon: windowInactiveIcon,
        cardBodyClass: 'text-secondary',
        accidentDate: null,
      };
      break;
    }
    default: {
      windowStatusInfo = {
        windowIcon: windowClosedIcon,
        cardBodyClass: '',
        accidentDate: null,
      };
    }
  }
  return (
    <div className={classNames('card', 'text-center', 'mb-4', s.sensorCard)}>
      <img
        alt="Window icon"
        className={classNames('card-img-top', s.windowImage)}
        src={windowStatusInfo.windowIcon}
      />
      <div
        className={classNames(
          'card-body',
          s.cardBody,
          windowStatusInfo.cardBodyClass,
        )}
      >
        <h5 className={classNames('card-title', s.cardTitle)}>
          {`${windowSensorInfo.name} (${windowSensorInfo.zone}) `}
        </h5>
        <div>
          <p className={classNames('card-text', s.cardText)}>
            {windowSensorInfo.status}
          </p>
          {windowStatusInfo.accidentDate && (
            <p className={classNames(s.cardText)}>
              on {windowStatusInfo.accidentDate}
            </p>
          )}
          {/* {windowSensorInfo.batteryCapacity <= MIN_BATTERY_CAPACITY && (
            <p className={classNames('text-info', s.cardText)}>
              Battery capacity is {windowSensorInfo.batteryCapacity}%, time to
              set up new battery!
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
}

WindowSensor.propTypes = {
  windowSensorInfo: PropTypes.shape({
    batteryCapacity: PropTypes.number,
    brokenTime: PropTypes.string,
    hackedTime: PropTypes.string,
    isActive: PropTypes.bool,
    isBroken: PropTypes.bool,
    isCracked: PropTypes.bool,
    isOpen: PropTypes.bool,
    name: PropTypes.string,
    status: PropTypes.string,
    switchTime: PropTypes.string,
    zone: PropTypes.string,
  }).isRequired,
};

WindowSensor.whyDidYouRender = true;
export default memo(WindowSensor);
