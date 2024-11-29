import React from 'react';
import { useEffect, useRef } from 'react';

const BootupSequence = ({ onComplete }) => {
  const lineComplete = useRef(false);
  useEffect(() => {
    const audio = new Audio('/boot.mp3');
    audio.volume = 0.05;
    audio.play();

    const appearingElements = document.querySelectorAll('.appearing');

    appearingElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.remove('opacity-0');
        element.classList.add('opacity-100');
        if(index === appearingElements.length - 1){
          lineComplete.current = true;
        }
      }, index * 1000 + (Math.random() * 1000));
    });


    window.addEventListener('keydown', () => {
      if(lineComplete.current == true){
        audio.volume = 0.01;
        onComplete();
      }
    });

    return () => {
      window.removeEventListener('keydown', () => {
        if(lineComplete){
          audio.volume = 0.01;
          onComplete();
        }
      });
    };
  }, [onComplete]);

  return (
    <div className="bootup-sequence p-4 h-full w-full flex justify-between flex-col bg-black text-lime-600 font-['IBM'] leading-loose">
      <div>
        <p className='appearing opacity-0'>ANGELOS (C)2024 God Produced</p>
        <p className='appearing opacity-0'>"In principio erat Verbum." (John 1:1)</p>
        <p className='appearing opacity-0'>Booting Divine Subroutines...</p>
        <p className='appearing opacity-0'>Initializing Celestial Framework...</p>
        <p className='appearing opacity-0'>Loading Archangels' Protocols...</p>
        <p className='appearing opacity-0'>Grace Modules Activated.</p>
      </div>
      <div>
        <p className='appearing opacity-0'>AngelOS Kernel v1.0 Ready.</p>
        <p className='appearing opacity-0'>Press any [key] to bring forth the light.</p>
      </div>
    </div>
  );
};

export default BootupSequence;