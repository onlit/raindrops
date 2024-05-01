import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Public_Sans } from 'next/font/google';

type RainDrop = {
  id: string;
  expression: string;
  answer: number;
  position: number;
};

const publicSans = Public_Sans({ subsets: ['latin'] });
const operators = ['+', '-', 'x', '÷'];
const padding = 36;
const raindropWidth = 80;
const maxWidth = 800;

const generateExpression = () => {
  const num1 = Math.floor(Math.random() * 14) + 1;
  const num2 = Math.floor(Math.random() * 14) + 1;
  const operator = operators[Math.floor(Math.random() * operators.length)];
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
  // Ensure position is at least `padding` pixels away from the left edge and adjust for the raindrop width
  const position =
    Math.random() * (maxWidth - raindropWidth - 2 * padding) + padding;
  return { expression, answer, position };
};

export default function Home() {
  const [raindrops, setRaindrops] = React.useState<RainDrop[]>([]);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newDrop = generateExpression();
      setRaindrops((current) => [...current, { ...newDrop, id: uuidv4() }]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const checkAnswer = (id: string, userAnswer: string) => {
    setRaindrops((current) => {
      const index = current.findIndex((drop) => drop.id === id);
      if (index > -1 && parseInt(userAnswer) === current[index].answer) {
        setScore((score) => score + 500);
        return current.filter((drop) => drop.id !== id);
      }
      return current;
    });
  };

  return (
    <main className={publicSans.className}>
      <div className=' w-[60%] max-w-[960px] mx-auto  mt-12'>
        <h1 className='font-semibold text-[#254052] mb-2 text-2xl'>
          Raindrops
        </h1>
        <p className='mb-6 text-[#254052] opacity-75'>
          Numerical calculation is the ability to perform simple arithmetic
          operations including addition, subtraction, multiplication, and
          division.
        </p>
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
              type='text'
              className='bg-[#2c4c61] w-[118px] h-[48px] text-white focus:outline-none focus:border-0 text-3xl text-center'
            />
          </div>
        </div>
        <p className='mb-6 text-[#254052] opacity-75 mt-6 text-center'>
          Made with 💜 by Onlit
        </p>
      </div>
    </main>
  );
}
