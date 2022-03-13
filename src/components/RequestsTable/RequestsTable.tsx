import { useRouter } from 'next/router'
import { getCampaignContract } from '../../contracts'
import { CampaignRequest } from '../../types/campaign'
import web3 from '../../web3'
import Button from '../Button'

type RequestsTableProps = {
  requests: CampaignRequest[]
  approversCount: string
}

const HeadCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <th
      scope='col'
      className='py-3 px-6 font-medium tracking-wider text-left text-gray-700 '
    >
      {children}
    </th>
  )
}

const BodyCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <td className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap'>
      {children}
    </td>
  )
}

const RequestsTable = ({ requests, approversCount }: RequestsTableProps) => {
  const router = useRouter()

  const onApprove = async (index: number) => {
    const campaignContract = getCampaignContract(router.query.address as string)

    const accounts = await web3.eth.getAccounts()
    await campaignContract.methods.approveRequest(index).send({
      from: accounts[0],
    })
  }

  const onFinalize = async (index: number) => {
    const campaignContract = getCampaignContract(router.query.address as string)
    const accounts = await web3.eth.getAccounts()

    await campaignContract.methods.finalizeRequest(index).send({
      from: accounts[0],
    })
  }

  return (
    <table className='border-collapse table-auto w-full mt-6'>
      <thead className='bg-gray-50'>
        <tr>
          <HeadCell>ID</HeadCell>
          <HeadCell>Description</HeadCell>
          <HeadCell>Amount</HeadCell>
          <HeadCell>Recipient</HeadCell>
          <HeadCell>Approval Count</HeadCell>
          <HeadCell>Approve</HeadCell>
          <HeadCell>Finalize</HeadCell>
        </tr>
      </thead>
      <tbody className='bg-white'>
        {requests.map(
          ({ description, value, recipient, approvalCount, complete }, index) => (
            <tr key={index} className='bg-white border-b'>
              <BodyCell>{index}</BodyCell>
              <BodyCell>{description}</BodyCell>
              <BodyCell>{web3.utils.fromWei(value, 'ether')}</BodyCell>
              <BodyCell>{recipient}</BodyCell>
              <BodyCell>
                {approvalCount}/{approversCount}
              </BodyCell>
              <BodyCell>
                <Button onClick={() => onApprove(index)}>Approve</Button>
              </BodyCell>
              <BodyCell>
                <Button onClick={() => onFinalize(index)}>Finalize</Button>
              </BodyCell>
            </tr>
          ),
        )}
      </tbody>
    </table>
  )
}

export default RequestsTable
