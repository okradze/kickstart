type H2Props = {
  children: React.ReactNode
}

const H2 = ({ children }: H2Props) => (
  <h2 className='text-xl font-bold mb-4'>{children}</h2>
)

export default H2
