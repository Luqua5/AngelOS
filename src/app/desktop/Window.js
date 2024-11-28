import React, { useState, useEffect, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Window = ({ title, onClose, onClick, zIndex }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const [initialWindowPos, setInitialWindowPos] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);

  const windowWidthRef = useRef(0);
  const windowHeightRef = useRef(0);

  useEffect(() => {
    const windowElement = document.getElementById('window');
    if (windowElement) {
      windowWidthRef.current = windowElement.offsetWidth;
      windowHeightRef.current = windowElement.offsetHeight;
    }
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setInitialMousePos({ x: e.clientX, y: e.clientY });
    setInitialWindowPos({ x: position.x, y: position.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - initialMousePos.x;
      const deltaY = e.clientY - initialMousePos.y;
      const newX = initialWindowPos.x + deltaX;
      const newY = initialWindowPos.y + deltaY;

      const boundedX = Math.max(0, Math.min(newX, window.innerWidth - windowWidthRef.current));
      const boundedY = Math.max(0, Math.min(newY, window.innerHeight - windowHeightRef.current));

      setPosition({ x: boundedX, y: boundedY });
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className="absolute bg-white shadow-lg rounded-lg w-64 h-64"
      id="window"
      style={{
        top: position.y,
        left: position.x,
        cursor: isDragging ? 'grabbing' : 'default',
        display: isMinimized ? 'none' : 'block',
        zIndex: zIndex,
      }}
      onMouseDown={onClick}
    >
      {/* Barre de titre */}
      <div
        className="bg-gray-800 text-white p-2 cursor-grab flex justify-between items-center"
        onMouseDown={handleMouseDown}
      >
        <span>{title}</span>
        <div>
          <button onClick={handleMinimize} className="text-white mr-2">
            <i className={`fas fa-window-minimize`}></i>
          </button>
          <button onClick={onClose} className="text-red-500">
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      <div className="p-4 text-black">Contenu pour {title}</div>
    </div>
  );
};

export default Window;