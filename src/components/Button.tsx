const Button = ({ type = 'submit', className = '', ...props }) => (
  <button
    // @ts-expect-error
    type={type}
    className={`${className} inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 focus:border-gray-900 focus:ring-3 focus:outline-hidden active:bg-gray-900 disabled:opacity-25`}
    {...props}
  />
)

export default Button
