'use client';

import DisplayCampaigns from './components/DisplayCampaigns';
import { useStateContext } from './context';

export default function Home() {
  const { getCampaigns } = useStateContext();
  const { data, isLoading, error } = getCampaigns;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <DisplayCampaigns
        title='All campaigns'
        isLoading={isLoading}
        campaigns={data}
      />
    </>
  );
}
