import React, { useContext } from 'react';
import { minutesNumber, hourNumber } from '../utils/fixNumber';
import useSelect from '../hooks/useSelect';
import { AlarmContext } from '../context/Alarm';
import { ToastContext } from '../context/ToastContext';
import Silence from '../assets/silence-10ms.mp3';
import './alarmOption.css';

const AlarmOption = () => {
  const [hour, setHour] = useSelect('Hour');
  const [minutes, setMinutes] = useSelect('Minutes');
  const [amPmOption, setAmPmOption] = useSelect('AM/PM');
  const { setAlarmTime, pauseAlarm, hasAlarm, setHasAlarm } =
    useContext(AlarmContext);
  const { addToast } = useContext(ToastContext);

  const setAlarm = async () => {
    // Toggle alarm OFF
    if (hasAlarm) {
      pauseAlarm();
      setHasAlarm(false);
      return;
    }
    // Toggle alarm ON
    if (
      !hour.includes('Hour') &&
      !minutes.includes('Minutes') &&
      !amPmOption.includes('AM/PM')
    ) {
      setHasAlarm(true);
      setAlarmTime(`${hour}:${minutes} ${amPmOption}`);

      // Workaround for Safari/iOS which won't play audio unless it is user initiated.
      // Playing 10ms of silence here so the alarm bell is permitted to play at the scheduled time.
      try {
        const silenceAudio = new Audio(Silence);
        await silenceAudio.play();
        addToast(`Alarm set for ${hour}:${minutes} ${amPmOption}`, 'success');
      } catch (error) {
        addToast(
          'Warning: Audio may not play on Safari/iOS. Please interact with the page first.',
          'warning'
        );
      }
    }
  };
  return (
    <div className="option-container">
      <div className={`wrapper-option ${hasAlarm && 'disable'}`}>
        <select {...setHour}>
          <option disabled value="Hour">
            Hour
          </option>
          {hourNumber.map((hour, index) => (
            <option key={index} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select {...setMinutes}>
          <option disabled value="Minutes">
            Minutes
          </option>
          {minutesNumber.map((minutes, index) => (
            <option key={index} value={minutes}>
              {minutes}
            </option>
          ))}
        </select>
        <select {...setAmPmOption}>
          <option disabled value="AM/PM">
            AM/PM
          </option>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <button
        onClick={setAlarm}
        className={`setAlarm-btn ${hasAlarm && 'play'}`}
      >
        {hasAlarm ? 'Clear Alarm' : 'Set Alarm'}
      </button>
    </div>
  );
};

export default AlarmOption;
