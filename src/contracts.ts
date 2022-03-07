import web3 from './web3'
import CampaignFactory from '../ethereum/build/CampaignFactory.json'

export const campaignFactoryContract = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x6A3B1a2377779996099A8bBCf1Ac8b4d0451d088',
)
