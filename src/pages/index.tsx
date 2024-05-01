import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Public_Sans } from 'next/font/google';

type RainDrop = {
  id: string;
  expression: string;
  answer: number;
  position: number;
  createdAt: number;
};

const publicSans = Public_Sans({ subsets: ['latin'] });
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

export default function Home() {
  const [raindrops, setRaindrops] = React.useState<RainDrop[]>([]);
  const [score, setScore] = React.useState(0);
  const [gameActive, setGameActive] = React.useState(false);

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

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log('false');
        setGameActive(false); // Pause the game when tab is inactive
      } else {
        console.log('true');
        setGameActive(true); // Resume the game when tab is active
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleAnswer = (userInput: string) => {
    const input = parseInt(userInput);
    const currentTime = Date.now();

    setRaindrops((current) =>
      current.filter((drop) => {
        // Calculate the animation progress
        const timeElapsed = currentTime - drop.createdAt;
        const animationDuration = 8000; // 8 seconds
        const animationProgress = timeElapsed / animationDuration;

        // Only consider drops where the animation is not yet complete
        if (animationProgress < 1) {
          const isCorrect = input === drop.answer;
          if (isCorrect) {
            setScore((score) => score + 500);
          }
          return !isCorrect;
        }

        return true; // Keep drops that have completed animation
      })
    );
  };

  return (
    <main className={publicSans.className}>
      <div className=' w-[60%] max-w-[960px] mx-auto  mt-12'>
        <div className='text-[#254052] flex justify-between items-center'>
          <h1 className='font-semibold mb-4 text-2xl'>Raindrops</h1>

          <div>
            <p>Score: {score}</p>
          </div>
        </div>

        <div className='bg-white p-4 border-[#e2e2e2] h-[660px] overflow-hidden rounded-md border'>
          <div className='bg-[#56b1c5] h-[540px] p-3 w-full overflow-hidden relative rounded-md rounded-b-none'>
            {raindrops.map((drop) => (
              <div
                key={drop.id}
                style={{ left: `${drop.position}px` }}
                className='bg-[#254052] flex items-center justify-center text-white font-semibold text-xl raindrop border-white border-4 w-20 h-20'
              >
                {drop.expression}
              </div>
            ))}
          </div>
          <div className='bg-[#254052] h-[90px] flex items-center justify-center rounded-md rounded-t-none'>
            <input
              type='number'
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  handleAnswer(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
              className='bg-[#2c4c61] w-[118px] h-[48px] text-white focus:outline-none focus:border-0 text-3xl text-center'
            />
          </div>
        </div>
        <div className='flex justify-center gap-4 mt-4'>
          <button
            onClick={() => setGameActive(true)}
            className='bg-[#0E91A1] text-white px-4 py-1.5 rounded'
          >
            Start
          </button>

          <button
            onClick={() => setGameActive(!gameActive)}
            className='bg-[#F1693C] text-white px-4 py-1.5 rounded'
          >
            Pause/Resume
          </button>
        </div>
        <p className='mb-6 text-[#254052] opacity-75 mt-6 text-center'>
          Made with 💜 by Onlit
        </p>
      </div>
    </main>
  );
}
