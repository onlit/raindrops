import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import RainDrop from '@/types/RainDrop';

const operators = ['+', '-', 'x', '÷'];
const padding = 36;
const raindropWidth = 80;
const maxWidth = 800;
const raindropSpacing = 100; // Minimum spacing between the centers of raindrops

const generateExpression = (existingDrops: RainDrop[]) => {
  let num1 = Math.floor(Math.random() * 14) + 1;
  let num2 = Math.floor(Math.random() * 14) + 1;
  const operator = operators[Math.floor(Math.random() * operators.length)];

  if (operator === '-' || operator === '÷') {
    if (num1 < num2) {
      [num1, num2] = [num2, num1]; // Ensure num1 is greater than num2
    }
    if (num2 === 0) num2 = 1; // Avoid division by zero

    if (operator === '÷') {
      // Adjust num1 to be a multiple of num2
      num1 = num2 * Math.floor(Math.random() * Math.floor(num1 / num2) + 1);
    }
  }

  let expression = `${num1} ${operator} ${num2}`;

  let answer;
  switch (operator) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case 'x':
      answer = num1 * num2;
      break;
    case '÷':
      answer = Math.floor(num1 / num2); // Use floor to avoid fractional answers
      break;
    default:
      answer = 0;
  }

  let position = 0;
  let validPosition = false;
  let attempts = 0;
  const maxAttempts = 100; // Maximum allowed attempts to find a valid position
  const defaultCalculation = () =>
    Math.random() * (maxWidth - raindropWidth - 2 * padding) + padding; // Function for default position

  while (!validPosition && attempts < maxAttempts) {
    position = defaultCalculation();
    validPosition = existingDrops.every(
      (drop) => Math.abs(drop.position - position) > raindropSpacing
    );
    attempts++;
  }

  if (!validPosition) {
    console.warn(
      'Failed to find a valid position after many attempts. Using a less restrictive default calculation.'
    );
    position = defaultCalculation(); // Use a less restrictive calculation for the default position.
  }

  return { id: uuidv4(), expression, answer, position, createdAt: Date.now() };
};

export default function useRaindrops(gameActive: boolean) {
  const [raindrops, setRaindrops] = React.useState<RainDrop[]>([]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameActive) {
      interval = setInterval(() => {
        setRaindrops((current) => [...current, generateExpression(current)]);
      }, 2000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [gameActive]);

  return [raindrops, setRaindrops] as const;
}
