import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import H2 from '../../../../components/H2'
import { getCampaignContract } from '../../../../contracts'
import web3 from '../../../../web3'

const RequestsNew = () => {
  const router = useRouter()

  const [description, setDescription] = useState('')
  const [ether, setEther] = useState('')
  const [recipient, setRecipient] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const requestsHref = `/campaigns/${router.query.address}/requests`

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const campaignContract = getCampaignContract(router.query.address as string)

    setLoading(true)

    try {
      const accounts = await web3.eth.getAccounts()

      await campaignContract.methods
        .createRequest(description, web3.utils.toWei(ether, 'ether'), recipient)
        .send({ from: accounts[0] })

      setError('')

      router.push(requestsHref)
    } catch (error) {
      setError('Error creating a new request')
    }

    setLoading(false)
  }

  return (
    <div>
      <Link href={requestsHref}>
        <a>Back</a>
      </Link>
      <H2>Create a Request</H2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Description</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Value in Ether</label>
          <input type='text' value={ether} onChange={(e) => setEther(e.target.value)} />
        </div>
        <div>
          <label>Recipient</label>
          <input
            type='text'
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>

        {error && <p>{error}</p>}

        <button type='submit'>{loading ? 'Creating...' : 'Create!'}</button>
      </form>
    </div>
  )
}

export default RequestsNew
