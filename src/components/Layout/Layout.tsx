import { ReactNode } from 'react'
import Header from '../Header'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='md:container md:mx-auto px-8'>
      <Header />
      {children}
    </div>
  )
}

export default Layout
