import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { getCampaignContract } from '../../../../contracts'
import web3 from '../../../../web3'

const RequestsNew = () => {
  const router = useRouter()

  const [description, setDescription] = useState('')
  const [ether, setEther] = useState('')
  const [recipient, setRecipient] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const campaignContract = getCampaignContract(router.query.address as string)

    try {
      const accounts = await web3.eth.getAccounts()

      await campaignContract.methods
        .createRequest(description, web3.utils.toWei(ether, 'ether'), recipient)
        .send({ from: accounts[0] })
    } catch (error) {}
  }

  return (
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

      <button type='submit'>Create!</button>
    </form>
  )
}

export default RequestsNew
