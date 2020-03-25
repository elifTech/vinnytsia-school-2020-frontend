import React from 'react';

import s from './ImageAttachment.css';

function renderImage(attachments) {
  return (
    <div className={s.imageAttachments}>
      <img alt="message attachments" src={attachments} />
    </div>
  );
}
export default renderImage;
