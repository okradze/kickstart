const Header = () => (
  <div className='flex justify-between border-2 border-gray-200'>
    <h1 className='text-lg py-2 border-r-2 border-gray-200 px-4'>CrowdCoin</h1>

    <div className='flex'>
      <button className='border-x-2 border-gray-200 px-4'>Campaigns</button>
      <button className='px-4'>+</button>
    </div>
  </div>
)

export default Header
