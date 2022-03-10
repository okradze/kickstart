import { NextPage } from 'next'
import Link from 'next/link'
import { campaignFactoryContract } from '../contracts'

type HomePageProps = {
  campaigns: string[]
}

const HomePage: NextPage<HomePageProps> = ({ campaigns }) => {
  return (
    <div>
      <h1>Open Campaigns</h1>
      <div>
        {campaigns.map((address) => (
          <div key={address}>
            <p>{address}</p>
            <Link href={`/campaigns/${address}`}>
              <a>View Campaign</a>
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
