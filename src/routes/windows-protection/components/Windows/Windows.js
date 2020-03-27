import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import classNames from 'classnames';
import map from 'lodash/map';
import property from 'lodash/property';
import s from './Windows.css';
import WindowItem from './WindowItem';
import { fetchWindowData } from '../../../../actions/window-sensors';

function Windows(props) {
  useStyles(s);
  const { title } = props;
  const dispatch = useDispatch();
  const windowData = useSelector(
    property('wSensors.fetchedWindowData'),
    shallowEqual,
  );
  const isLoading = useSelector(property('wSensors.isLoading'), shallowEqual);
  useEffect(() => {
    dispatch(fetchWindowData());
  }, [dispatch]);

  const windows = map(windowData, window => {
    return <WindowItem key={window.id} windowInfo={window} />;
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
        {windows}
      </div>
    </div>
  );
}
Windows.propTypes = {
  title: PropTypes.string.isRequired,
};

Windows.whyDidYouRender = true;

export default memo(Windows);
