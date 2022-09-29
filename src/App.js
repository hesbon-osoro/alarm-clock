import AnalogClock from './components/AnalogClock';
import Alarm from './context/Alarm';
import AlarmOption from './components/AlarmOption';
import DigitalClock from './components/DigitalClock';
import './App.css';
import ProximitySensor, { onMouseMove } from './components/ProximitySensor';

function App() {
  return (
    <section className="clock container" onMouseMove={onMouseMove}>
      <ProximitySensor />
      <div className="clock-container grid">
        <div className="clock-content grid">
          <Alarm>
            <AnalogClock />
            <DigitalClock />
            <AlarmOption />
          </Alarm>
        </div>
      </div>
    </section>
  );
}

export default App;
