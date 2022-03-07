import { NextPage } from 'next'
import { campaignFactoryContract } from '../contracts'

type HomePageProps = {
  campaigns: string[]
}

const HomePage: NextPage<HomePageProps> = ({ campaigns }) => {
  return (
    <div>
      <h1>Campaigns</h1>
      <div>
        {campaigns.map((campaign) => (
          <p key={campaign}>{campaign}</p>
        ))}
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
