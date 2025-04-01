const Input = ({ disabled = false, className, ...props }) => (
  <input
    disabled={disabled}
    className={`${className} focus:ring-opacity-50 rounded-md border-gray-300 shadow-xs focus:border-indigo-300 focus:ring-3 focus:ring-indigo-200`}
    {...props}
  />
)

export default Input
