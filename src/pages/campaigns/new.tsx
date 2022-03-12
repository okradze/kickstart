import { FormEvent, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import web3 from '../../web3'
import { campaignFactoryContract } from '../../contracts'
import Input from '../../components/Input'
import Link from 'next/link'
import H2 from '../../components/H2'
import Button from '../../components/Button'

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
      <H2>Create a Campaign</H2>

      <form onSubmit={onSubmit}>
        <Input
          label='Minimum Contribution (wei)'
          value={minimumContribution}
          onChange={(e) => setMinimumContribution(e.target.value)}
        />
        <p className='mt-2 text-red-500'>{error}</p>

        <Button type='submit' loading={loading}>
          Create!
        </Button>
      </form>
    </div>
  )
}

export default CampaignNew
