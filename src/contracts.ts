import web3 from './web3'
import CampaignFactory from '../ethereum/build/CampaignFactory.json'
import Campaign from '../ethereum/build/Campaign.json'

export const campaignFactoryContract = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x338b473c2a35972BAdDc9eC3BBC565a845038AEE',
)

export const getCampaignContract = (address: string) => {
  return new web3.eth.Contract(JSON.parse(Campaign.interface), address)
}
