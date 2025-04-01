import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Campaign } from '../types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FundCard from './FundCard';
import { customLoader } from '../utils';

type DisplayCampaignsProps = {
  title: string;
  isLoading: boolean;
  campaigns: readonly Campaign[] | undefined;
};

const DisplayCampaigns = ({
  title,
  isLoading,
  campaigns,
}: DisplayCampaignsProps) => {
  const router = useRouter();

  const handleNavigate = (campaign: Campaign, index: number) => {
    router.push(`/campaign-details/${campaign.title}-${index}`);
  };

  if (!campaigns) {
    return <h3>No campaigns</h3>;
  }

  return (
    <div>
      <h1 className='font-epilogue font-semibold text-[18px] text-white text-left'>
        {title} ({campaigns.length})
      </h1>

      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {isLoading && (
          <Image
            src='/loader.svg'
            alt='loader'
            width={100}
            height={100}
            className='object-contain'
            loader={customLoader}
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className='font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]'>
            You have not created any campigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign, index) => (
            <FundCard
              key={uuidv4()}
              {...campaign}
              handleClick={() => handleNavigate(campaign, index)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
