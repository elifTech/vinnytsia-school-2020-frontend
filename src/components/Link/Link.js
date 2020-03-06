import withStyles from 'isomorphic-style-loader/withStyles';
import startsWith from 'lodash/startsWith';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import history from '../../history';
import style from './Link.css';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function isExternal(to) {
  if (startsWith(to, 'http://') || startsWith(to, 'https://')) {
    return true;
  }
  return false;
}

class Link extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    to: PropTypes.string.isRequired,
  };

  static defaultProps = {
    className: '',
    onClick: null,
  };

  handleClick = event => {
    const { onClick, to } = this.props;
    if (onClick) {
      onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    if (!isExternal(to)) {
      event.preventDefault();
      history.push(to);
    }
  };

  static whyDidYouRender = true;

  render() {
    const { to, children, className } = this.props;
    return (
      <a
        className={className}
        href={to}
        onClick={this.handleClick}
        target={isExternal(to) ? '_blank' : undefined}
      >
        {children}
      </a>
    );
  }
}

export default withStyles(style)(memo(Link));
