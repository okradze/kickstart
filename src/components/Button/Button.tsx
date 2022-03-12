import React from 'react'

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
      className='font-bold bg-sky-600 text-white py-2 px-6 rounded inline-block mt-2'
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  )
}
export default Button
