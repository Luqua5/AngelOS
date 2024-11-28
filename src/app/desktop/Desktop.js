// src/app/desktop/Desktop.js
"use client";

import Icon from './Icon';
import Taskbar from './Taskbar';
import Window from './Window';
import { useEffect, useState } from 'react';

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [windowOrder, setWindowOrder] = useState([]);

  // Fonction pour ouvrir un module en cliquant sur une icône
  const openWindow = (moduleName) => {
    if (!openWindows.includes(moduleName)) {
      setOpenWindows([...openWindows, moduleName]);
      setWindowOrder([...windowOrder, moduleName]);
    }
  };

  // Fonction pour fermer une fenêtre
  const closeWindow = (moduleName) => {
    setOpenWindows(openWindows.filter((name) => name !== moduleName));
    setWindowOrder(windowOrder.filter((name) => name !== moduleName));
  };

  // Fonction pour amener une fenêtre au premier plan
  const bringToFront = (moduleName) => {
    setWindowOrder(windowOrder.filter((name) => name !== moduleName).concat(moduleName));
  };

  return (
    <div className="h-full w-full bg-blue-800 relative">
      {/* Icônes sur le bureau */}
      <div className="flex flex-wrap p-4">
        <Icon label="truc1" onClick={() => openWindow('truc1')} />
        <Icon label="Truc2" onClick={() => openWindow('Truc2')} />
        {/* Ajoute d'autres icônes ici pour d'autres modules */}
      </div>

      {/* Fenêtres ouvertes */}
      {openWindows.map((moduleName) => (
        <Window 
          key={moduleName} 
          title={moduleName}
          zIndex={windowOrder.indexOf(moduleName) + 1} 
          onClick={() => bringToFront(moduleName)} 
          onClose={() => closeWindow(moduleName)} />
      ))}

      {/* Barre des tâches */}
      <Taskbar openWindows={openWindows} />
    </div>
  );
};

export default Desktop;
