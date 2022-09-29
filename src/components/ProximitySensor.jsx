import React from 'react';
import RickyMonty from '../assets/rickymonty.png';
import Eye from '../assets/eye.png';
import './proximitySensor.css';

export const onMouseMove = e => {
  const anchor = document.getElementById('anchor');
  const rect = anchor.getBoundingClientRect();
  const anchorX = rect.left + rect.width / 2;
  const anchorY = rect.top + rect.height / 2;
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);
  const eyes = document.querySelectorAll('.eye');
  eyes.forEach(eye => {
    eye.style.transform = `rotate(${90 + angleDeg}deg)`;
    anchor.style.filter = `hue-rotate(${angleDeg}deg)`;
  });
};

function angle(cx, cy, ex, ey) {
  const dy = ey - cy;
  const dx = ex - cx;
  const rad = Math.atan2(dy, dx); //range(-PI,PI)
  const deg = (rad * 180) / Math.PI; //radians to degrees, range (-180, 180)
  return deg;
}
const ProximitySensor = () => {
  return (
    <aside className="main">
      <img src={RickyMonty} alt="Ricky and Monty" id="anchor" />
      <div id="eyes">
        <img
          src={Eye}
          alt="Eye"
          className="eye"
          style={{ top: '57px', right: '20px' }}
        />
        <img
          src={Eye}
          alt="Eye"
          className="eye"
          style={{ top: '66px', right: '78px' }}
        />
        <img
          src={Eye}
          alt="Eye"
          className="eye"
          style={{ bottom: '54px', left: '104px' }}
        />
        <img
          src={Eye}
          alt="Eye"
          className="eye"
          style={{ bottom: '52px', left: '48px' }}
        />
      </div>
    </aside>
  );
};

export default ProximitySensor;
