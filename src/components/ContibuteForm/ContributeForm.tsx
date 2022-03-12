import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { getCampaignContract } from '../../contracts'
import web3 from '../../web3'
import Button from '../Button'
import Input from '../Input'

const ContributeForm = () => {
  const router = useRouter()

  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    const campaignContract = getCampaignContract(router.query.address as string)

    try {
      const accounts = await web3.eth.getAccounts()
      await campaignContract.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(amount, 'ether'),
      })

      router.replace(router.asPath)

      setError('')
      setAmount('')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
      setError('Error, please try again')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        label='Amount to Contribute (ether)'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <p className='mt-2 text-red-500'>{error}</p>

      <Button type='submit' loading={loading}>
        Contribute
      </Button>
    </form>
  )
}

export default ContributeForm
