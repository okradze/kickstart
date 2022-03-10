import { FormEvent, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import web3 from '../../web3'
import { campaignFactoryContract } from '../../contracts'

const CampaignNew: NextPage = () => {
  const router = useRouter()

  const [minimumContribution, setMinimumContribution] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      const accounts = await web3.eth.getAccounts()

      await campaignFactoryContract.methods
        .createCampaign(parseFloat(minimumContribution))
        .send({
          from: accounts[0],
        })

      router.push('/')
    } catch (error) {
      if (typeof error === 'string') {
        setError(error)
      } else {
        setError('An unknown error occurred.')
      }
    }

    setLoading(false)
  }

  return (
    <div>
      <h2>Create a Campaign</h2>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor=''>Minimum Contribution</label>
          <input
            type='text'
            value={minimumContribution}
            onChange={(e) => setMinimumContribution(e.target.value)}
          />
          <p>{error}</p>
        </div>

        <button type='submit'>{loading ? 'Creating...' : 'Create!'}</button>
      </form>
    </div>
  )
}

export default CampaignNew
