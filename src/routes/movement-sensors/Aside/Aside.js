import React from 'react';
import withStyle from 'isomorphic-style-loader/withStyles';
import PropTypes from 'prop-types';
import s from './Aside.css';

function Aside({
  isEdit,
  file,
  addSensor,
  fileHandler,
  saveHandler,
  cancelHandler,
  editHandler,
}) {
  const classes = ['btn', 'btn-primary'];
  return (
    <aside className={s.Aside}>
      {isEdit ? (
        <>
          <button disabled={!file} onClick={addSensor} type="button">
            Add Sensor
          </button>
          <label className={s.addFile} htmlFor="addfile">
            Add file
            <input
              accept="image/*"
              id="addfile"
              onChange={fileHandler}
              type="file"
            />
          </label>
          <button onClick={saveHandler} type="button">
            Save
          </button>
          <button onClick={cancelHandler} type="button">
            Cancel
          </button>
        </>
      ) : (
        <button
          className={classes.join(' ')}
          onClick={editHandler}
          type="button"
        >
          Edit
        </button>
      )}
    </aside>
  );
}

Aside.propTypes = {
  addSensor: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  editHandler: PropTypes.func.isRequired,
  file: PropTypes.string.isRequired,
  fileHandler: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  saveHandler: PropTypes.func.isRequired,
};

export default withStyle(s)(React.memo(Aside));
