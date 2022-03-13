import { ReactNode, useEffect, useState } from 'react'
import web3 from '../../web3'
import Header from '../Header'
import Spinner from '../Spinner'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const checkWeb3Network = async () => {
      const chainId = await web3.eth.net.getId()

      if (chainId === 4) {
        return setConnected(true)
      }

      //@ts-ignore
      await window.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(4) }],
      })

      setConnected(true)
    }

    checkWeb3Network()
  }, [])

  return (
    <div className='md:container md:mx-auto px-8'>
      {connected ? (
        <>
          <Header />
          {children}
        </>
      ) : (
        <div className='flex items-center justify-center h-screen'>
          <p className='flex items-center text-3xl text-gray-800 gap-6'>
            Switching to Rinkeby Network <Spinner className='w-8 h-8 text-gray-700' />
          </p>
        </div>
      )}
    </div>
  )
}

export default Layout
