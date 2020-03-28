import React, { memo } from 'react';
import PropTypes from 'prop-types';
import HomeView from './components/HomeView';
import Windows from './components/Windows';
import NavBar from './components/NavBar';

function WindowsProtection(props) {
  const { title } = props;
  // I will rewrite when I finish the NavBar component
  return (
    <div>
      <NavBar title={title} />
      <HomeView title="Interactive window sensors map" />
      <Windows title="Windows in your home" />
    </div>
  );
}
WindowsProtection.propTypes = {
  title: PropTypes.string.isRequired,
};
WindowsProtection.whyDidYouRender = true;
export default memo(WindowsProtection);
