import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import ContributeForm from '../../../components/ContibuteForm'
import CampaignDetailsCard from '../../../components/CampaignDetailsCard'
import { getCampaignContract } from '../../../contracts'

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
  const cards = [
    {
      title: address,
      label: 'Address Of manager',
      description:
        'The manager created this campaign and can create requests to withdraw money',
    },
    {
      title: minimumContribution,
      label: 'Minimum Contribution (wei)',
      description: 'You must contribute at least this much wei to become an approver',
    },
    {
      title: requestsCount,
      label: 'Number of Requests',
      description:
        'A request tries to withdraw money from the contract. Requests must be approved by approvers',
    },
    {
      title: approversCount,
      label: 'Number of Approvers',
      description: 'Number of people who have already donated to this campaign',
    },
    {
      title: balance,
      label: 'Campaign Balance (ether)',
      description: 'The balance is how much money this campaign has left to spend',
    },
  ]

  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>Campaign Details</h2>

      <div className='grid grid-cols-2'>
        <div>
          <div className='grid grid-cols-2 gap-8'>
            {cards.map((props) => (
              <CampaignDetailsCard key={props.label} {...props} />
            ))}
          </div>

          <Link href={`/campaigns/${address}/requests`}>
            <a className='font-bold bg-sky-600 text-white py-2 px-6 rounded inline-block mt-8'>
              View Requests
            </a>
          </Link>
        </div>

        <ContributeForm />
      </div>
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
