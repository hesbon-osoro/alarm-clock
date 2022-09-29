import React, { useState, useContext } from 'react';
import { FcAlarmClock } from 'react-icons/fc';
import { AlarmContext } from '../context/Alarm';
import './analogClock.css';

const AnalogClock = () => {
  const [hour, setHour] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const { hasAlarm } = useContext(AlarmContext);

  const clock = () => {
    let date = new Date();
    let hh = date.getHours() * 30;
    let mm = date.getMinutes() * 6;
    let ss = date.getSeconds() * 6;

    setHour(`rotateZ(${hh + mm / 12}deg)`);
    setMinutes(`rotateZ(${mm}deg)`);
    setSeconds(`rotateZ(${ss}deg)`);
  };
  setInterval(clock, 1000);
  return (
    <div className="clock-circle">
      <FcAlarmClock className={`alarm-icon ${hasAlarm && 'active'}`} />
      <span className="clock-twelve"></span>
      <span className="clock-three"></span>
      <span className="clock-six"></span>
      <span className="clock-nine"></span>

      <div className="clock-rounder"></div>
      <div className="clock-hour" style={{ transform: hour }}></div>
      <div className="clock-minutes" style={{ transform: minutes }}></div>
      <div className="clock-seconds" style={{ transform: seconds }}></div>
    </div>
  );
};

export default AnalogClock;
