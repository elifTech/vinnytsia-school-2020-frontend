import React, { memo } from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import classNames from 'classnames';
import s from './NavBar.css';

function NavBar(props) {
  useStyles(s);
  const { title } = props;
  return (
    <div className={s.navBar}>
      <div>
        <span className="navbar-brand">{title}</span>
        <button className={classNames('btn', 'btn-link')} type="button">
          Sensors map
        </button>
        <button className={classNames('btn', 'btn-link')} type="button">
          Windows
        </button>
      </div>
      <button className={classNames('btn', 'btn-link')} type="button">
        Settings
      </button>
    </div>
  );
}
NavBar.propTypes = {
  title: PropTypes.string.isRequired,
};
NavBar.whyDidYouRender = true;
export default memo(NavBar);
