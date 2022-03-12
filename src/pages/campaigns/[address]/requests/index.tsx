import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import H2 from '../../../../components/H2'
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
      <H2>Requests</H2>

      <Link href={`${router.asPath}/new`}>
        <a className='font-bold bg-sky-600 text-white py-2 px-6 rounded inline-block mt-2'>
          Add Request
        </a>
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
