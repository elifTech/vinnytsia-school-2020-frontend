import React, { useState, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import map from 'lodash/map';
import filter from 'lodash/filter';
import maxBy from 'lodash/maxBy';
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
  useStyles(s);
  const dispatch = useDispatch();
  const imgUrl = useSelector(
    property('movementDetection.imgUrl'),
    shallowEqual,
  );
  const isDisarmed = useSelector(
    property('movementDetection.isDisarmed'),
    shallowEqual,
  );
  const sensors = useSelector(
    property('movementDetection.sensors'),
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

  const disarmHandler = useCallback(() => {
    dispatch(disarmSensors());
  }, [dispatch]);

  const editHandler = useCallback(() => {
    setIsEdit(!isEdit);
    setLocalState({ imgUrl, sensors: Array.from(sensors) });
  }, [imgUrl, isEdit, sensors]);

  const saveHandler = useCallback(() => {
    setIsEdit(false);
    dispatch(updateSensors(localState.sensors));
    dispatch(addImgUrl(localState.imgUrl));
  }, [dispatch, localState]);
  const cancelHandler = useCallback(() => {
    setIsEdit(false);
    setLocalState({ imgUrl, sensors });
  }, [imgUrl, sensors]);

  const addSensorHandler = useCallback(() => {
    const nextSensorId =
      localState.sensors.length > 0
        ? maxBy(localState.sensors, 'id').id + 1
        : 0;
    setLocalState({
      ...localState,
      sensors: [
        ...localState.sensors,
        { x: 0, y: 0, location: '', id: nextSensorId },
      ],
    });
  }, [localState]);
  const deleteSensorHandler = useCallback(
    index => {
      const newSensors = filter(
        localState.sensors,
        (sensor, sensorIndex) => sensorIndex !== index,
      );
      setLocalState({ ...localState, sensors: newSensors });
    },
    [localState],
  );
  const updateLocationHandler = useCallback(
    (index, location) => {
      const newSensors = Array.from(localState.sensors);
      newSensors[index] = {
        ...newSensors[index],
        location,
      };
      setLocalState({ ...localState, sensors: newSensors });
    },
    [localState],
  );

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
export default React.memo(MovementDetection);
