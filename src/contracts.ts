import web3 from './web3'
import CampaignFactory from '../ethereum/build/CampaignFactory.json'

export const campaignFactoryContract = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x338b473c2a35972BAdDc9eC3BBC565a845038AEE',
)
