import React from 'react';

export default function useAudio(url: string) {
  const scoreAudioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      scoreAudioRef.current = new Audio(url);
    }
  }, [url]);

  return scoreAudioRef.current;
}
