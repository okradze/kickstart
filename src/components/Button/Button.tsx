import React from 'react'
import Spinner from '../Spinner'

type ButtonHTMLProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type ButtonProps = ButtonHTMLProps & {
  children: React.ReactNode
  loading?: boolean
  disabled?: boolean
}

const Button = ({ children, loading, disabled, ...props }: ButtonProps) => {
  return (
    <button
      className='flex items-center justify-center font-bold bg-sky-600 text-white py-2 px-6 rounded inline-block'
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  )
}
export default Button
