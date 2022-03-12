type InputHTMLProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputProps = InputHTMLProps & {
  label?: string
}

const Input = ({ label, ...props }: InputProps) => (
  <div>
    {label && <label className='block text-gray-800 text-md mb-1'>{label}</label>}
    <input
      type='text'
      className='block p-2 border border-slate-400 rounded-md'
      {...props}
    />
  </div>
)

export default Input
