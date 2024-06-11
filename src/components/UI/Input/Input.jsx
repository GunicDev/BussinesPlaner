/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Input({
  label,
  type,
  name,
  placeholder,
  onChange,
  value,
}) {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="absolute -top-3 left-2 inline-block px-1 text-xs font-medium text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className=" pl-3 block bg-inherit w-full py-1.5 text-white shadow-sm border-b-2 placeholder:text-gray-400  outline-none sm:text-sm sm:leading-6"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
