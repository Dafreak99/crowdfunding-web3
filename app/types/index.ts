import { PreparedTransaction, PrepareTransactionOptions } from 'thirdweb';
import { type UseQueryResult } from '@tanstack/react-query';
import { AbiFunction } from 'thirdweb/utils';

export type Navlink = {
  name: string;
  imgUrl: string;
  link: string;
  disabled?: boolean;
};

export type CreateCampaignForm = {
  name: string;
  title: string;
  description: string;
  target: string | bigint;
  deadline: string;
  image: string;
};

export type CreateCampaignFormParam = {
  _owner: string;
  _title: string;
  _description: string;
  _target: bigint;
  _deadline: bigint;
  _image: string;
};

export type MutationOptionsParam = {
  onSuccess: () => void;
  onError: (error: Error) => void;
};

export type CreateCampaignFormParams = (
  form: CreateCampaignForm,
  options: MutationOptionsParam,
) => void;

export type CreateCampaignContractParams = (
  form: CreateCampaignFormParam,
  options: MutationOptionsParam,
) => void;

export type Campaign = {
  owner: string;
  title: string;
  description: string;
  target: bigint;
  deadline: bigint;
  amountCollected: bigint;
  image: string;
  donators: readonly string[];
  donations: readonly bigint[];
};

export type StateContextType = {
  address: string;
  connect: () => void;
  getCampaigns: UseQueryResult<readonly Campaign[]>;
  getUserCampaigns: () => Campaign[];
  findCampaign: (campaignId: number) => Campaign;
  createCampaign: CreateCampaignFormParams;
  donateCampaign: (
    id: bigint,
    amount: number,
    options: MutationOptionsParam,
  ) => void;
};

export type sendTransactionType = PreparedTransaction<
  [],
  AbiFunction,
  PrepareTransactionOptions
>;
