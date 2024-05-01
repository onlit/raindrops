import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div>
      <p>Score: {score}</p>
    </div>
  );
}
