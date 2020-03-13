import 'bootstrap/dist/css/bootstrap.min.css';
import withStyles from 'isomorphic-style-loader/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.css';

function Layout(props) {
  const { children } = props;
  return <div className="container-fluid">{children}</div>;
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
Layout.whyDidYouRender = true;
export default withStyles(normalizeCss, s)(React.memo(Layout));
