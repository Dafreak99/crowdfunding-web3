import React, { useState } from 'react';

import { customLoader, daysLeft } from '../utils';
import Image from 'next/image';
import { Campaign } from '../types';
import { ethers } from 'ethers';

type FundCardProps = Campaign & {
  handleClick: () => void;
};

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}: FundCardProps) => {
  const [imageError, setImageError] = useState(false);
  const remainingDays = daysLeft(Number(deadline));

  return (
    <div
      className='sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer'
      onClick={handleClick}
    >
      <Image
        src={imageError ? '/web3.jpg' : image}
        alt='fund'
        width={300}
        height={150}
        className='w-[300px] h-[150px] object-contain rounded-[15px]'
        loader={customLoader}
        onError={() => setImageError(true)}
      />

      <div className='flex flex-col p-4'>
        <div className='flex flex-row items-center mb-[18px]'>
          <Image
            src='/type.svg'
            alt='tag'
            width={17}
            height={17}
            className='object-contain'
            loader={customLoader}
          />

          <p className='ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]'>
            Charity
          </p>
        </div>

        <div className='block'>
          <h3 className='font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate'>
            {title}
          </h3>
          <p className='mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate'>
            {description}
          </p>
        </div>

        <div className='flex justify-between flex-wrap mt-[15px] gap-2'>
          <div className='flex flex-col'>
            <h4 className='font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'>
              {ethers.formatUnits(amountCollected)}
            </h4>
            <p className='mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate'>
              Raised of {ethers.formatUnits(target)} ETH
            </p>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'>
              {remainingDays}
            </h4>
            <p className='mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate'>
              Days Left
            </p>
          </div>
        </div>

        <div className='flex items-center mt-[20px] gap-[12px]'>
          <div className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]'>
            <Image
              src='/thirdweb.png'
              alt='user'
              width={30}
              height={30}
              className='w-1/2 h-1/2 object-contain'
              loader={customLoader}
            />
          </div>
          <p className='flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate'>
            by{' '}
            <span className='text-[#b2b3bd]'>
              {owner.slice(0, 10) +
                '...' +
                owner.slice(owner.length - 4, owner.length)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
