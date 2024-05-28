export default function Button({ children, type }) {
  return (
    <button
      type={type}
      className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 hover:text-white"
    >
      {children}
    </button>
  );
}
