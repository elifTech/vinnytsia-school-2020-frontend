import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.css';

function Layout(props) {
  const { children } = props;
  return <div>{children}</div>;
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
Layout.whyDidYouRender = true;
export default withStyles(normalizeCss, s)(React.memo(Layout));
