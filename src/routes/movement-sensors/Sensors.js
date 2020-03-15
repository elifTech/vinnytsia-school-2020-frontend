import React, { useState, useCallback } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import map from 'lodash/map';
import Sensor from './Sensor/Sensor';
import Aside from './Aside/Aside';
import s from './Sensors.css';

function Sensors() {
  const [file, setFile] = useState('');
  const [sensors, setSensors] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [prvState, setPrvState] = useState([]);

  const setData = useCallback(
    (event, ui, i) => {
      const newSensors = Array.from(sensors);
      newSensors[i] = { x: ui.x, y: ui.y };
      setSensors(newSensors);
    },
    [sensors],
  );

  function fileHandler(event) {
    const f = event.target.files[0];
    const fr = new FileReader();
    fr.readAsDataURL(f);
    fr.addEventListener('load', () => {
      setFile(fr.result);
    });
  }

  function editHandler() {
    setIsEdit(!isEdit);
    setPrvState(Array.from(sensors));
  }
  function saveHandler() {
    setIsEdit(!isEdit);
  }
  function cancelHandler() {
    setIsEdit(!isEdit);
    setSensors(Array.from(prvState));
  }
  function addSensor() {
    setSensors([...sensors, { x: 0, y: 0 }]);
  }
  return (
    <div className={s.container}>
      <div className={s.mainWrapper}>
        <Aside
          addSensor={addSensor}
          cancelHandler={cancelHandler}
          editHandler={editHandler}
          file={file}
          fileHandler={fileHandler}
          isEdit={isEdit}
          saveHandler={saveHandler}
        />
        <div className={s.main}>
          {map(sensors, (sensor, i) => (
            <Sensor
              key={i}
              dataHandler={setData}
              index={i}
              isEdit={isEdit}
              sensor={sensor}
            />
          ))}
          <div className={s.imgContainer}>
            <img alt="house plan" src={file} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default withStyles(s)(React.memo(Sensors));
