import { useRouter } from 'next/router'
import { getCampaignContract } from '../../contracts'
import { CampaignRequest } from '../../types/campaign'
import web3 from '../../web3'
import Button from '../Button'

type RequestsTableProps = {
  requests: CampaignRequest[]
  approversCount: string
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
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Recipient</th>
          <th>Approval Count</th>
          <th>Approve</th>
          <th>Finalize</th>
        </tr>
      </thead>
      <tbody>
        {requests.map(
          ({ description, value, recipient, approvalCount, complete }, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{description}</td>
              <td>{web3.utils.fromWei(value, 'ether')}</td>
              <td>{recipient}</td>
              <td>
                {approvalCount}/{approversCount}
              </td>
              <td>
                <Button onClick={() => onApprove(index)}>Approve</Button>
              </td>
              <td>
                <Button onClick={() => onFinalize(index)}>Finalize</Button>
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  )
}

export default RequestsTable
