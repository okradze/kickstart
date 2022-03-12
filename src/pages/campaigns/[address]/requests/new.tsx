import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import H2 from '../../../../components/H2'
import Input from '../../../../components/Input'
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
    setError('')

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
        <a className='text-cyan-700 underline block mb-6'>Back</a>
      </Link>
      <H2>Create a Request</H2>
      <form onSubmit={onSubmit}>
        <Input
          label='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input label='Ether' value={ether} onChange={(e) => setEther(e.target.value)} />
        <Input
          label='Recipient'
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />

        <p className='mt-2 text-red-500'>{error}</p>

        <button
          type='submit'
          className='font-bold bg-sky-600 text-white py-2 px-6 rounded inline-block mt-2'
        >
          {loading ? 'Creating...' : 'Create!'}
        </button>
      </form>
    </div>
  )
}

export default RequestsNew
