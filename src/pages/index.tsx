import { NextPage } from 'next'
import Link from 'next/link'
import { campaignFactoryContract } from '../contracts'

type HomePageProps = {
  campaigns: string[]
}

const HomePage: NextPage<HomePageProps> = ({ campaigns }) => {
  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>Open Campaigns</h2>
      <div>
        {campaigns.map((address) => (
          <div key={address} className='border-2 border-gray-200 rounded-md p-3'>
            <p className='text-lg font-bold mb-1'>{address}</p>
            <Link href={`/campaigns/${address}`}>
              <a className='text-cyan-700'>View Campaign</a>
            </Link>
          </div>
        ))}
      </div>
      <Link href='/campaigns/new'>
        <a>Create Campaign</a>
      </Link>
    </div>
  )
}

export const getServerSideProps = async () => {
  const campaigns = await campaignFactoryContract.methods.getDeployedCampaigns().call()

  return {
    props: {
      campaigns,
    },
  }
}

export default HomePage
