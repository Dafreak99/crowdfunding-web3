'use client';

import { useContext, createContext, PropsWithChildren } from 'react';
import {
  useActiveAccount,
  useConnect,
  useReadContract,
  useSendTransaction,
} from 'thirdweb/react';
import { client } from '../libs/ThirdWebClient';
import { prepareContractCall } from 'thirdweb';
import { createWallet } from 'thirdweb/wallets';
import contract from '../libs/Contract';
import { type UseQueryResult } from '@tanstack/react-query';
import {
  Campaign,
  CreateCampaignContractParams,
  CreateCampaignFormParams,
  MutationOptionsParam,
  sendTransactionType,
  StateContextType,
} from '../types';
import { ethers } from 'ethers';

const StateContext = createContext<StateContextType>({
  address: '',
  connect: async () => null,
  getCampaigns: {} as UseQueryResult<readonly Campaign[]>,
  getUserCampaigns: () => [],
  findCampaign: () => ({} as Campaign),
  createCampaign: () => {},
  donateCampaign: () => {},
});

export const StateContextProvider = ({ children }: PropsWithChildren) => {
  const { connect: connectFn } = useConnect();
  const { mutate: sendTransaction } = useSendTransaction();
  const activeAccount = useActiveAccount();
  const getCampaigns = useReadContract({
    contract,
    method: 'getCampaigns',
    params: [],
  });

  const connect = () => {
    connectFn(async () => {
      // instantiate wallet
      const wallet = createWallet('io.metamask');
      // connect wallet
      await wallet.connect({
        client,
      });
      // return the wallet
      return wallet;
    });
  };

  const getUserCampaigns = () => {
    const { data } = getCampaigns;
    const filteredCampaigns = data?.filter(
      (campaign: Campaign) => campaign.owner === activeAccount?.address,
    );

    return filteredCampaigns as Campaign[];
  };

  const findCampaign = (campaignId: number) => {
    const { data } = getCampaigns;
    const campaign = data?.[campaignId];
    return campaign as Campaign;
  };

  const publicCampaign: CreateCampaignFormParams = async (
    form,
    { onSuccess, onError },
  ) => {
    try {
      const data = await createCampaign(
        {
          _owner: activeAccount?.address || '',
          _title: form.title,
          _description: form.description,
          _target: form.target as unknown as bigint,
          _deadline: new Date(
            form.deadline as unknown as Date,
          ).getTime() as unknown as bigint,
          _image: form.image,
        },
        {
          onSuccess,
          onError,
        },
      );

      console.log('contract called', data);
    } catch (error) {
      console.log(error);
    }
  };

  const createCampaign: CreateCampaignContractParams = (
    { _owner, _title, _description, _target, _deadline, _image },
    { onSuccess, onError },
  ) => {
    const transaction = prepareContractCall({
      contract,
      method: 'createCampaign',
      params: [_owner, _title, _description, _target, _deadline, _image],
    }) as sendTransactionType;

    sendTransaction(transaction, {
      onError,
      onSuccess,
    });
  };

  const donateCampaign = (
    _id: bigint,
    _amount: number,
    _options: MutationOptionsParam,
  ) => {
    const transaction = prepareContractCall({
      contract,
      method: 'donateToCampaign',
      params: [_id],
      value: ethers.parseEther(_amount.toString()),
    }) as sendTransactionType;

    sendTransaction(transaction, _options || {});
  };

  return (
    <StateContext.Provider
      value={{
        address: activeAccount?.address || '',
        connect,
        getCampaigns,
        getUserCampaigns,
        findCampaign,
        createCampaign: publicCampaign,
        donateCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error(
      'useStateContext must be used within a StateContextProvider',
    );
  }

  return context;
};
