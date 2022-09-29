import React, { useContext } from 'react';
import { AlarmContext } from '../context/Alarm';
import './digitalClock.css';

const DigitalClock = () => {
  const { hourDigital, minutesDigital, amPm, dayNow, monthNow, yearNow } =
    useContext(AlarmContext);

  return (
    <div>
      <div className="clock-text">
        <div className="clock-text-hour">{`${hourDigital}:`}</div>
        <div className="clock-text-minutes">{minutesDigital}</div>
        <div className="clock-text-ampm">{amPm}</div>
      </div>
      <div className="clock-date">
        <span>{`${dayNow} `}</span>
        <span>{`${monthNow} , `}</span>
        <span>{yearNow}</span>
      </div>
    </div>
  );
};

export default DigitalClock;
