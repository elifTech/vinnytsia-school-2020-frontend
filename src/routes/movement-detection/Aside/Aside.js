import React from 'react';
import withStyle from 'isomorphic-style-loader/withStyles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
  return (
    <aside className={classNames(s.Aside, 'btn-group-vertical')}>
      {isEdit ? (
        <>
          <button
            className={classNames('btn', 'btn-primary')}
            disabled={!file}
            onClick={addSensor}
            type="button"
          >
            Add Sensor
          </button>
          <label
            className={classNames(s.addFile, 'btn', 'btn-primary')}
            htmlFor="addfile"
          >
            Add plan
            <input
              accept="image/*"
              id="addfile"
              onChange={fileHandler}
              type="file"
            />
          </label>
          <button
            className={classNames('btn', 'btn-success')}
            onClick={saveHandler}
            type="button"
          >
            Save
          </button>
          <button
            className={classNames('btn', 'btn-danger')}
            onClick={cancelHandler}
            type="button"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          className={classNames('btn', 'btn-primary')}
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

Aside.whyDidYouRender = true;
export default withStyle(s)(React.memo(Aside));
