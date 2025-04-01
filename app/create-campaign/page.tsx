'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';

import { checkIfImage, customLoader } from '../utils';
import Loader from '../components/Loader';
import Image from 'next/image';
import CustomButton from '../components/CustomButton';
import { useRouter } from 'next/navigation';
import FormField from '../components/FormField';
import { useStateContext } from '../context';
import { CreateCampaignForm } from '../types';

const CreateCampaign = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState<CreateCampaignForm>({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleFormFieldChange = (
    fieldName: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        createCampaign(
          {
            ...form,
            target: ethers.parseUnits(form.target.toString(), 18),
          },
          {
            onSuccess: () => {
              setIsLoading(false);
              router.push('/');
            },
            onError: (error) => {
              setIsLoading(false);
              alert(error.message);
            },
          },
        );
      } else {
        alert('Provide valid image URL');
        setForm({ ...form, image: '' });
      }
    });
  };

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && <Loader />}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className='w-full mt-[65px] flex flex-col gap-[30px]'
      >
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName='Your Name *'
            placeholder='John Doe'
            inputType='text'
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName='Campaign Title *'
            placeholder='Write a title'
            inputType='text'
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField
          labelName='Story *'
          placeholder='Write your story'
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className='w-full flex justify-start items-center px-4 bg-[#8c6dfd] h-[90px] rounded-[10px]'>
          <Image
            src='/money.svg'
            alt='money'
            width={32}
            height={32}
            className='object-contain'
            loader={customLoader}
          />
          <h4 className='font-epilogue font-bold text-[25px] text-white ml-3'>
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName='Goal *'
            placeholder='ETH 0.50'
            inputType='text'
            value={form.target as string}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName='End Date *'
            placeholder='End Date'
            inputType='date'
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField
          labelName='Campaign image *'
          placeholder='Place image URL of your campaign'
          inputType='url'
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className='flex justify-center items-center mt-[40px]'>
          <CustomButton
            btnType='submit'
            title='Submit new campaign'
            styles='bg-[#1dc071]'
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
