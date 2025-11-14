import React, {
  createContext,
  useEffect,
  useState,
  useRef,
  useContext,
} from 'react';
import months from '../constants/months';
import Sound from '../assets/mixkit-casino-win-alarm-and-coins-1990.mp3';
import { ToastContext } from './ToastContext';

export const AlarmContext = createContext();

function Alarm({ children }) {
  const { addToast } = useContext(ToastContext);
  const [hourDigital, setHourDigital] = useState('');
  const [minutesDigital, setMinutesDigital] = useState('');
  const [amPm, setAmPm] = useState('');
  const [dayNow, setDayNow] = useState('');
  const [monthNow, setMonthNow] = useState('');
  const [yearNow, setYearNow] = useState('');
  const [alarmTime, setAlarmTime] = useState('');
  const [hasAlarm, setHasAlarm] = useState(false);
  const alarmRef = useRef(null);
  const hasPlayedRef = useRef(false);

  // Initialize audio object
  useEffect(() => {
    alarmRef.current = new Audio(Sound);
    alarmRef.current.loop = true;

    // Cleanup on unmount
    return () => {
      if (alarmRef.current) {
        alarmRef.current.pause();
        alarmRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    setInterval(() => {
      let date = new Date();
      let HH = date.getHours();
      let MM = date.getMinutes();
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      let ampm;

      if (HH >= 12) {
        HH = HH - 12;
        ampm = 'PM';
      } else {
        ampm = 'AM';
      }
      if (HH === 0) HH = 12;
      if (HH < 10) HH = `0${HH}`;
      if (MM < 10) MM = `0${MM}`;

      setHourDigital(HH);
      setMinutesDigital(MM);
      setAmPm(ampm);
      setDayNow(day);
      setMonthNow(months[month]);
      setYearNow(year);
    }, 1000);
  }, []);

  // Handle alarm triggering
  useEffect(() => {
    const playAlarm = async () => {
      if (
        alarmTime === `${hourDigital}:${minutesDigital} ${amPm}` &&
        !hasPlayedRef.current &&
        alarmRef.current
      ) {
        hasPlayedRef.current = true;
        try {
          await alarmRef.current.play();
        } catch (error) {
          addToast('Failed to play alarm sound. Retrying...', 'error');
          // Retry once after a short delay (helps on some browsers)
          setTimeout(async () => {
            try {
              await alarmRef.current.play();
            } catch (retryError) {
              addToast(
                'Unable to play alarm. Please check your browser settings.',
                'error'
              );
            }
          }, 100);
        }
      }
    };

    playAlarm();
  }, [hourDigital, minutesDigital, amPm, alarmTime, addToast]);

  const pauseAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    }
    hasPlayedRef.current = false;
    setAlarmTime('');
  };
  return (
    <AlarmContext.Provider
      value={{
        hourDigital,
        minutesDigital,
        amPm,
        dayNow,
        monthNow,
        yearNow,
        alarmTime,
        setAlarmTime,
        pauseAlarm,
        hasAlarm,
        setHasAlarm,
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
}

export default Alarm;
