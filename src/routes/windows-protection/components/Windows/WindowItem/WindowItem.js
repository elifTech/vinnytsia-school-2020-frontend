import React, { memo } from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import classNames from 'classnames';
import s from './WindowItem.css';
import windowOpenIcon from './Images/w-open.png';
import windowClosedIcon from './Images/w-closed.png';
import windowBrokenIcon from './Images/w-broken.png';
import windowInactiveIcon from './Images/w-inactive.png';

const windowOptionsSet = new Map();
windowOptionsSet.set('closed', {
  windowIcon: windowClosedIcon,
  cardBodyClass: '',
});
windowOptionsSet.set('open', {
  windowIcon: windowOpenIcon,
  cardBodyClass: 'text-success',
});
windowOptionsSet.set('broken', {
  windowIcon: windowBrokenIcon,
  cardBodyClass: 'text-danger',
});
windowOptionsSet.set('hacked', {
  windowIcon: windowBrokenIcon,
  cardBodyClass: 'text-danger',
});
windowOptionsSet.set('inactive', {
  windowIcon: windowInactiveIcon,
  cardBodyClass: 'text-secondary',
  msg: 'Check the sensors on the map',
});

function WindowItem(props) {
  useStyles(s);
  const { windowInfo } = props;
  const windowOptions = { ...windowOptionsSet.get(windowInfo.status) };

  return (
    <div className={classNames('card', 'text-center', 'mb-4', s.sensorCard)}>
      <img
        alt="Window icon"
        className={classNames('card-img-top', s.windowImage)}
        src={windowOptions.windowIcon}
      />
      <div
        className={classNames(
          'card-body',
          s.cardBody,
          windowOptions.cardBodyClass,
        )}
      >
        <h5 className={classNames('card-title', s.cardTitle)}>
          {`${windowInfo.name} (${windowInfo.zone}) `}
        </h5>
        <div>
          <p className={classNames('card-text', s.cardText)}>
            {windowInfo.status}
          </p>
          {windowInfo.accidentDate && (
            <p className={classNames(s.cardText)}>
              on {windowInfo.accidentDate}
            </p>
          )}
          {windowOptions.msg && (
            <p className={classNames(s.cardText)}>{windowOptions.msg}</p>
          )}
        </div>
      </div>
    </div>
  );
}

WindowItem.propTypes = {
  windowInfo: PropTypes.shape({
    accidentDate: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    status: PropTypes.string,
    zone: PropTypes.string,
  }).isRequired,
};

WindowItem.whyDidYouRender = true;
export default memo(WindowItem);
