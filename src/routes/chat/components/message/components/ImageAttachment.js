import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import PropTypes from 'prop-types';

import s from './ImageAttachment.css';

function ImageAttachment({ attachment }) {
  useStyles(s);
  return (
    <div className={s.imageAttachment}>
      <img alt="message attachment" src={attachment} />
    </div>
  );
}

ImageAttachment.defaultProps = {
  attachment: null,
};
ImageAttachment.propTypes = {
  attachment: PropTypes.string,
};

export default ImageAttachment;
