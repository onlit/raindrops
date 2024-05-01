import { Public_Sans } from 'next/font/google';

const publicSans = Public_Sans({ subsets: ['latin'] });

export default function Home() {
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
          <div className='bg-[#56b1c5] h-[540px] p-3 w-full] rounded-md rounded-b-none'>
            <div className='bg-[#254052] flex items-center justify-center text-white font-semibold text-xl raindrop border-white border-4 w-20 h-20'>
              5 - 2
            </div>
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
