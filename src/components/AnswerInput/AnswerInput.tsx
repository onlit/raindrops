import React from 'react';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
}

export default function AnswerInput({ onSubmit }: AnswerInputProps) {
  return (
    <input
      type='number'
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          if (isNaN(+e.currentTarget.value)) {
            return;
          }
          onSubmit(e.currentTarget.value);
          e.currentTarget.value = '';
        }
      }}
      className='bg-[#2c4c61] w-[118px] h-[48px] text-white focus:outline-none focus:border-0 text-3xl text-center'
    />
  );
}
