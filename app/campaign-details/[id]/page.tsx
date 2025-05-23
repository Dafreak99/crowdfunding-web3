'use client';

import React, { useState } from 'react';

import { useStateContext } from '../../context';
import { calculateBarPercentage, customLoader, daysLeft } from '../../utils';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import CustomButton from '@/app/components/CustomButton';
import CountBox from '@/app/components/CountBox';
import { ethers } from 'ethers';
import contract from '@/app/libs/Contract';
import { useReadContract } from 'thirdweb/react';

const CampaignDetails = () => {
  const [imageError, setImageError] = useState(false);

  const params = useParams();
  const router = useRouter();
  const { findCampaign } = useStateContext();

  const { id = '' } = params;

  const [, campaignId] = (id as string).split('-');

  const campaign = findCampaign(Number(campaignId));

  console.log('campaign', campaign);
  const { donateCampaign } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');

  const remainingDays = daysLeft(Number(campaign?.deadline || 0));

  const { data: rawDonators } = useReadContract({
    contract,
    method: 'getDonators',
    params: [BigInt(campaignId)],
  });

  const convertRawDonators = (rawDonators: [[], []]) => {
    const donators = rawDonators?.[0].map((donator, index) => ({
      donator,
      donation: rawDonators[1][index],
    }));

    return donators;
  };

  const donators = convertRawDonators(rawDonators as unknown as [[], []]);

  const hasDonators = donators && donators?.length > 0;

  // const fetchDonators = async () => {
  //   const data = await getDonations(state.pId);

  //   setDonators(data);
  // }

  // useEffect(() => {
  //   if(contract) fetchDonators();
  // }, [contract, address])

  const handleDonate = async () => {
    console.log('id', campaignId, 'amount', amount);
    setIsLoading(true);

    donateCampaign(BigInt(campaignId), +amount, {
      onSuccess: () => {
        router.push('/');
        setIsLoading(false);
      },
      onError: (error) => {
        console.log(error);
        setIsLoading(false);
      },
    });
  };

  if (!campaign) return null;

  return (
    <div>
      {/* {isLoading && <Loader />} */}

      <div className='w-full flex md:flex-row flex-col mt-10 gap-[30px]'>
        <div className='flex-1 flex-col'>
          <Image
            src={imageError ? '/web3.jpg' : campaign.image}
            alt='campaign'
            width={410}
            height={410}
            className='object-cover rounded-xl'
            loader={customLoader}
            onError={() => setImageError(true)}
          />
          <div className='relative w-full h-[5px] bg-[#3a3a43] mt-2'>
            <div
              className='absolute h-full bg-[#4acd8d]'
              style={{
                width: `${calculateBarPercentage(
                  Number(campaign.target),
                  Number(campaign.amountCollected),
                )}%`,
                maxWidth: '100%',
              }}
            ></div>
          </div>
        </div>

        <div className='flex md:w-[200px] w-full flex-wrap justify-between gap-[30px]'>
          <CountBox title='Days Left' value={remainingDays} />
          <CountBox
            title={`Raised of ${ethers.formatUnits(
              campaign.target.toString(),
            )} ETH`}
            value={ethers.formatUnits(campaign.amountCollected)}
          />
          <CountBox title='Total Backers' value={donators?.length || 0} />
        </div>
      </div>

      <div className='mt-[60px] flex lg:flex-row flex-col gap-5'>
        <div className='flex-[2] flex gap-[40px]'>
          <div className='flex-1 flex flex-col gap-[40px]'>
            <div>
              <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
                Creator
              </h4>

              <div className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px]'>
                <div className='w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer'>
                  <Image
                    src='/thirdweb.png'
                    alt='user'
                    width={60}
                    height={60}
                    className='object-contain'
                    loader={customLoader}
                  />
                </div>
                <div>
                  <h4 className='font-epilogue font-semibold text-[14px] text-white break-all'>
                    {campaign.owner}
                  </h4>
                  <p className='mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]'>
                    10 Campaigns
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
                Story
              </h4>

              <div className='mt-[20px]'>
                <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>
                  {campaign.description}
                </p>
              </div>
            </div>

            <div>
              <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
                Donators
              </h4>

              <div className='mt-[20px] flex flex-col gap-4'>
                {hasDonators ? (
                  donators.map((item, index) => (
                    <div
                      key={`${item.donator}-${index}`}
                      className='flex justify-between items-center gap-4'
                    >
                      <p className='font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll'>
                        {index + 1}. {item.donator}
                      </p>
                      <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll'>
                        {ethers.formatUnits(item.donation)} ETH
                      </p>
                    </div>
                  ))
                ) : (
                  <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>
                    No donators yet. Be the first one!
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className='flex-1'>
            <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
              Fund
            </h4>

            <div className='mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]'>
              <p className='font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]'>
                Fund the campaign
              </p>
              <div className='mt-[30px]'>
                <input
                  type='number'
                  placeholder='ETH 0.1'
                  step='0.01'
                  className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <div className='my-[20px] p-4 bg-[#13131a] rounded-[10px]'>
                  <h4 className='font-epilogue font-semibold text-[14px] leading-[22px] text-white'>
                    Back it because you believe in it.
                  </h4>
                  <p className='mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]'>
                    Support the project for no reward, just because it speaks to
                    you.
                  </p>
                </div>

                <CustomButton
                  btnType='button'
                  title='Fund Campaign'
                  isLoading={isLoading}
                  styles='w-full bg-[#8c6dfd] disabled'
                  handleClick={handleDonate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
