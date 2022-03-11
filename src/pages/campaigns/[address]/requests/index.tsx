import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const RequestsPage: NextPage = () => {
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

export default RequestsPage
