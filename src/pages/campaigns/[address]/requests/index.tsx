import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getCampaignContract } from '../../../../contracts'
import H2 from '../../../../components/H2'
import RequestsTable from '../../../../components/RequestsTable'

interface CampaignRequest {
  description: string
  value: string
  recipient: string
  complete: boolean
  approvalCount: string
}

type RequestsPageProps = {
  requests: CampaignRequest[]
  requestsCount: string
  approversCount: string
}

const RequestsPage: NextPage<RequestsPageProps> = ({
  requestsCount,
  approversCount,
  requests,
}) => {
  const router = useRouter()

  return (
    <div>
      <H2>Requests</H2>

      <Link href={`${router.asPath}/new`}>
        <a className='font-bold bg-sky-600 text-white py-2 px-6 rounded inline-block mt-2'>
          Add Request
        </a>
      </Link>

      <RequestsTable requests={requests} approversCount={approversCount} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const campaignContract = getCampaignContract(query.address as string)

  const requestsCount = await campaignContract.methods.getRequestsCount().call()
  const approversCount = await campaignContract.methods.approversCount().call()

  const requests = await Promise.all(
    Array(parseInt(requestsCount))
      .fill(null)
      .map(async (_, index) => {
        const { description, value, recipient, complete, approvalCount } =
          await campaignContract.methods.requests(index).call()

        return {
          description,
          value,
          recipient,
          complete,
          approvalCount,
        }
      }),
  )

  return {
    props: {
      requestsCount,
      approversCount,
      requests,
    },
  }
}

export default RequestsPage
