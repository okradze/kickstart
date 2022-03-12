import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getCampaignContract } from '../../../../contracts'

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
}

const RequestsPage: NextPage<RequestsPageProps> = ({ requestsCount, requests }) => {
  const router = useRouter()

  return (
    <div>
      <h2>Requests</h2>
      <Link href={`${router.asPath}/new`}>
        <a>New Request</a>
      </Link>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const campaignContract = getCampaignContract(query.address as string)

  const requestsCount = await campaignContract.methods.getRequestsCount().call()

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
      requests,
    },
  }
}

export default RequestsPage
