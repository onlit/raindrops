import React from 'react';
import { Public_Sans } from 'next/font/google';
import AnswerInput from '@/components/AnswerInput/AnswerInput';
import useRaindrops from '@/hooks/useRaindrops';
import RainDrop from '@/types/RainDrop';
import useAudio from '@/hooks/useAudio';
import ScoreDisplay from '@/components/ScoreDisplay/ScoreDisplay';
import GameControl from '@/components/GameControl/GameControl';
import Raindrop from '@/components/Raindrop/Raindrop';
import useTabVisibility from '@/hooks/useTabVisibility';

const publicSans = Public_Sans({ subsets: ['latin'] });

export default function Home() {
  const [score, setScore] = React.useState(0);
  const [gameActive, setGameActive] = React.useState(false);

  const [raindrops, setRaindrops] = useRaindrops(gameActive);
  const scoreAudio = useAudio('/ca.mp3');

  useTabVisibility({
    onHidden: () => setGameActive(false),
    onVisible: () => setGameActive(true),
  });

  const handleAnswer = (userInput: string) => {
    const input = parseInt(userInput);
    const currentTime = Date.now();

    const newRainDrops = raindrops.filter((drop: RainDrop) => {
      // Calculate the animation progress
      const timeElapsed = currentTime - drop.createdAt;
      const animationDuration = 8000; // 8 seconds
      const animationProgress = timeElapsed / animationDuration;

      // Only consider drops where the animation is not yet complete
      if (animationProgress < 1) {
        const isCorrect = input === drop.answer;
        if (isCorrect) {
          if (scoreAudio) {
            scoreAudio.play();
          }
          setScore(score + 500);
        }
        return !isCorrect;
      }

      return true; // Keep drops that have completed animation
    });

    setRaindrops(newRainDrops);
  };

  return (
    <main className={publicSans.className}>
      <div className=' w-[60%] max-w-[960px] mx-auto  mt-12'>
        <div className='text-[#254052] flex justify-between items-center'>
          <h1 className='font-semibold mb-4 text-2xl'>Raindrops</h1>

          <ScoreDisplay score={score} />
        </div>

        <div className='bg-white p-4 border-[#e2e2e2] h-[660px] overflow-hidden relative rounded-md border'>
          <GameControl
            gameActive={gameActive}
            onGameStart={() => setGameActive(true)}
          />

          <div className='bg-[#56b1c5] h-[540px] p-3 w-full overflow-hidden relative rounded-md rounded-b-none'>
            {raindrops.map((drop: RainDrop) => (
              <Raindrop key={drop.id} drop={drop} />
            ))}
          </div>
          <div className='bg-[#254052] h-[90px] flex items-center justify-center rounded-md rounded-t-none'>
            <AnswerInput onSubmit={handleAnswer} />
          </div>
        </div>
      </div>
    </main>
  );
}
