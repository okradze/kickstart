import { ReactNode, useEffect, useState } from 'react'
import web3 from '../../web3'
import Header from '../Header'
import Spinner from '../Spinner'

type LayoutProps = {
  children: ReactNode
}

enum Web3Status {
  LOADING,
  NO_WALLET_CONFIGURED,
  WRONG_NETWORK_CONNECTED,
  CONNECTED,
}

const Layout = ({ children }: LayoutProps) => {
  const [status, setStatus] = useState(Web3Status.LOADING)

  useEffect(() => {
    const checkWeb3Network = async () => {
      //@ts-ignore
      if (!window.ethereum) {
        return setStatus(Web3Status.NO_WALLET_CONFIGURED)
      }

      const chainId = await web3.eth.net.getId()

      if (chainId === 4) {
        return setStatus(Web3Status.CONNECTED)
      }

      setStatus(Web3Status.WRONG_NETWORK_CONNECTED)

      //@ts-ignore
      await window.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(4) }],
      })

      setStatus(Web3Status.CONNECTED)
    }

    checkWeb3Network()
  }, [])

  if (status === Web3Status.LOADING) {
    return <div></div>
  }

  if (status !== Web3Status.CONNECTED) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='flex items-center text-3xl text-gray-800 gap-6'>
          {status === Web3Status.WRONG_NETWORK_CONNECTED && (
            <>
              Switching to Rinkeby Network <Spinner className='w-8 h-8 text-gray-700' />
            </>
          )}
          {status === Web3Status.NO_WALLET_CONFIGURED &&
            'Please configure your crypto wallet first'}
        </p>
      </div>
    )
  }

  return (
    <div className='md:container md:mx-auto px-8'>
      <Header />
      {children}
    </div>
  )
}

export default Layout
