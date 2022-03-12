import Link from 'next/link'

const Header = () => (
  <div className='flex justify-between rounded-md border-2 border-gray-200 mt-2'>
    <Link href='/'>
      <a>
        <h1 className='text-lg py-2 border-r-2 border-gray-200 px-4'>CrowdCoin</h1>
      </a>
    </Link>

    <div className='flex'>
      <Link href='/'>
        <a className='border-x-2 border-gray-200 px-4 flex items-center'>Campaigns</a>
      </Link>
      <Link href='/campaigns/new'>
        <a className='px-4 flex items-center'>+</a>
      </Link>
    </div>
  </div>
)

export default Header
