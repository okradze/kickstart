import { GetServerSideProps, NextPage } from 'next'
import ContributeForm from '../../components/ContibuteForm/ContributeForm'
import { getCampaignContract } from '../../contracts'

type CampaignSummary = {
  minimumContribution: string
  balance: string
  requestsCount: string
  approversCount: string
  managerAddress: string
  address: string
}

const CampaignDetails: NextPage<CampaignSummary> = ({
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  managerAddress,
  address,
}) => {
  return (
    <div>
      <h1>Campaign Details</h1>
      <div>
        <p>{managerAddress}</p>
        <p>Address of manager</p>
        <p>The manager created this campaign and can create requests to withdraw money</p>
      </div>

      <ContributeForm />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const address = params?.address as string
  const campaignContract = getCampaignContract(address)

  const summary = await campaignContract.methods.getSummary().call()

  return {
    props: {
      minimumContribution: summary['0'],
      balance: summary['1'],
      requestsCount: summary['2'],
      approversCount: summary['3'],
      managerAddress: summary['4'],
      address,
    },
  }
}

export default CampaignDetails
