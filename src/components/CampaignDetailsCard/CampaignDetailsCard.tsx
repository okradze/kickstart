type CampaignDetailsCardProps = {
  title: string
  label: string
  description: string
}

const CampaignDetailsCard = ({ title, label, description }: CampaignDetailsCardProps) => (
  <div className='p-3 rounded-md border-2 border-gray-200'>
    <h4 className='text-lg font-bold break-all'>{title}</h4>
    <p className='text-base text-zinc-500 mb-2'>{label}</p>
    <p className='text-base text-zinc-800'>{description}</p>
  </div>
)

export default CampaignDetailsCard
