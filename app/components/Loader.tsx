import Image from 'next/image';
import React from 'react';
import { customLoader } from '../utils';

const Loader = () => {
  return (
    <div className='fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col'>
      <Image
        src='/loader.svg'
        alt='loader'
        width={100}
        height={100}
        className='object-contain'
        loader={customLoader}
      />
      <p className='mt-[20px] font-epilogue font-bold text-[20px] text-white text-center'>
        Transaction is in progress <br /> Please wait...
      </p>
    </div>
  );
};

export default Loader;
