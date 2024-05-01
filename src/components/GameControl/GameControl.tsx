import React from 'react';

interface GameControlProps {
  gameActive: boolean;
  onGameStart: () => void;
}

export default function GameControl({
  onGameStart,
  gameActive,
}: GameControlProps) {
  return !gameActive ? (
    <div className='absolute z-10 w-full h-full top-0 right-0 bg-white opacity-90 flex items-center justify-center'>
      <button
        onClick={onGameStart}
        className='bg-[#0E91A1] text-white text-xl px-4 py-1.5 rounded'
      >
        Start Game
      </button>
    </div>
  ) : null;
}
