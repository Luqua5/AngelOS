"use client";

import { useEffect } from 'react';

import './globals.css';

export default function RootLayout({ children }) {
  useEffect(() => {
    const screen = document.querySelector('.screen-container');

    const intervalId = setInterval(() => {
      screen.style.transform = `translate(${Math.random() * 2}px, ${Math.random() * 2}px)`;
    }, 50);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      screen.style.transform = `translate(0, 0)`;
    }, 200);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <div className="screen-container">
          {children}
        </div>
      </body>
    </html>
  )
}
