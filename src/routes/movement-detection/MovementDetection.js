import React, { useState, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import map from 'lodash/map';
import filter from 'lodash/filter';
import reduce from 'lodash/reduce';
import property from 'lodash/property';
import Aside from './Aside/Aside';
import Info from './Info/Info';
import Sensor from './Sensor/Sensor';
import addImgUrl from '../../actions/movementDetections/img';
import {
  updateSensors,
  disarmSensors,
} from '../../actions/movementDetections/sensors';
import s from './MovementDetection.css';

function MovementDetection() {
  const dispatch = useDispatch();
  const { imgUrl, sensors, isDisarmed } = useSelector(
    property('movementDetection'),
    shallowEqual,
  );
  const [isEdit, setIsEdit] = useState(false);
  const [localState, setLocalState] = useState({ imgUrl, sensors });

  const { imgUrl: imgToRender, sensors: sensorsToRender } = isEdit
    ? localState
    : { imgUrl, sensors };

  const positionHandler = useCallback(
    (ui, index) => {
      const nextState = {
        ...localState,
        sensors: Array.from(localState.sensors),
      };
      nextState.sensors[index] = {
        ...nextState.sensors[index],
        x: ui.x,
        y: ui.y,
      };
      setLocalState(nextState);
    },
    [localState],
  );

  const fileHandler = useCallback(
    event => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.addEventListener('load', () => {
        setLocalState({ ...localState, imgUrl: fileReader.result });
      });
    },
    [localState],
  );

  function disarmHandler() {
    dispatch(disarmSensors());
  }
  function editHandler() {
    setIsEdit(!isEdit);
    setLocalState({ imgUrl, sensors: Array.from(sensors) });
  }
  function saveHandler() {
    setIsEdit(false);
    dispatch(updateSensors(localState.sensors));
    dispatch(addImgUrl(localState.imgUrl));
  }
  function cancelHandler() {
    setIsEdit(false);
    setLocalState({ imgUrl, sensors });
  }

  function addSensorHandler() {
    const nextSensorId =
      reduce(
        localState.sensors,
        (previous, next) => (previous < next.id ? next.id : previous),
        0,
      ) + 1;
    setLocalState({
      ...localState,
      sensors: [
        ...localState.sensors,
        { x: 0, y: 0, location: '', id: nextSensorId },
      ],
    });
  }
  function deleteSensorHandler(index) {
    const newSensors = filter(
      localState.sensors,
      (sensor, sensorIndex) => sensorIndex !== index,
    );
    setLocalState({ ...localState, sensors: newSensors });
  }
  function updateLocationHandler(index, location) {
    const newSensors = Array.from(localState.sensors);
    newSensors[index] = {
      ...newSensors[index],
      location,
    };
    setLocalState({ ...localState, sensors: newSensors });
  }

  return (
    <div className={s.container}>
      <h1 className={s.title}>Movement detection</h1>
      <main className={s.content}>
        <Aside
          addSensorHandler={addSensorHandler}
          cancelHandler={cancelHandler}
          disarmHandler={disarmHandler}
          editHandler={editHandler}
          fileHandler={fileHandler}
          imgUrl={imgToRender}
          isDisarmed={isDisarmed}
          isEdit={isEdit}
          saveHandler={saveHandler}
        />
        <section className={s.mainContent}>
          {(imgToRender && (
            <div className={s.planWrapper}>
              {map(sensorsToRender, (sensor, i) => (
                <Sensor
                  key={i}
                  deleteSensorHandler={deleteSensorHandler}
                  index={i}
                  isDisarmed={isDisarmed}
                  isEdit={isEdit}
                  positionHandler={positionHandler}
                  sensor={sensor}
                  updateLocationHandler={updateLocationHandler}
                />
              ))}
              <div className={s.imgContainer}>
                <img alt="house plan" src={imgToRender} />
              </div>
            </div>
          )) || <h2>Your home plan may be here.</h2>}
        </section>
        <Info isDisarmed={isDisarmed} sensors={sensors} />
      </main>
    </div>
  );
}

MovementDetection.whyDidYouRender = true;
export default withStyles(s)(React.memo(MovementDetection));
