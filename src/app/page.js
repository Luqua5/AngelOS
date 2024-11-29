'use client';

import Desktop from './desktop/Desktop';
import BootupSequence from './bootup/BootupSequence';

import { useState } from 'react';

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <main className='h-full'>
      {isBooting && <BootupSequence onComplete={() => setIsBooting(false)} />}
      {!isBooting && <Desktop />}
    </main>
  );
}