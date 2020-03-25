import React from 'react';
import withStyle from 'isomorphic-style-loader/withStyles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import s from './Aside.css';

function Aside({
  addSensorHandler,
  cancelHandler,
  disarmHandler,
  editHandler,
  fileHandler,
  isDisarmed,
  imgUrl,
  isEdit,
  saveHandler,
}) {
  return (
    <aside className={classNames(s.Aside, 'btn-group-vertical')}>
      {isEdit ? (
        <>
          <label
            className={classNames(s.addFile, 'btn', 'btn-primary')}
            htmlFor="addfile"
          >
            {imgUrl ? 'Change plan' : 'Add plan'}
            <input
              accept="image/*"
              id="addfile"
              onChange={fileHandler}
              type="file"
            />
          </label>
          <button
            className="btn btn-primary"
            disabled={!imgUrl}
            onClick={addSensorHandler}
            type="button"
          >
            Add Sensor
          </button>

          <div className={classNames(s.btnContainer, 'btn-group-vertical')}>
            <button
              className="btn btn-success"
              onClick={saveHandler}
              type="button"
            >
              Save
            </button>
            <button
              className="btn btn-danger"
              onClick={cancelHandler}
              type="button"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <button className="btn btn-primary" onClick={editHandler} type="button">
          Settings
        </button>
      )}
      <div className={s.btnContainer}>
        <button
          className={classNames('btn', {
            'btn-success': !isDisarmed,
            'btn-warning': isDisarmed,
          })}
          onClick={disarmHandler}
          type="button"
        >
          {isDisarmed ? 'SECURITY OFFLINE' : 'SECURITY ONLINE'}
        </button>
      </div>
    </aside>
  );
}

Aside.propTypes = {
  addSensorHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  disarmHandler: PropTypes.func.isRequired,
  editHandler: PropTypes.func.isRequired,
  fileHandler: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  isDisarmed: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  saveHandler: PropTypes.func.isRequired,
};

Aside.whyDidYouRender = true;
export default withStyle(s)(React.memo(Aside));
