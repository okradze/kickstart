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
      <div className='flex gap-8 items-start'>
        <div className='grow'>
          {campaigns.map((address) => (
            <div key={address} className='border-2 border-gray-200 rounded-md p-3 mb-4'>
              <p className='text-lg font-bold mb-1'>{address}</p>
              <Link href={`/campaigns/${address}`}>
                <a className='text-cyan-700'>View Campaign</a>
              </Link>
            </div>
          ))}
        </div>
        <Link href='/campaigns/new'>
          <a className='font-bold bg-sky-600 text-white py-2 px-6 rounded inline-block'>
            Create Campaign
          </a>
        </Link>
      </div>
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
