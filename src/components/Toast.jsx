import React from 'react';
import './toast.css';

const Toast = ({ id, message, type, onClose }) => {
  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <span className="toast-message">{message}</span>
        <button className="toast-close" onClick={() => onClose(id)}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
