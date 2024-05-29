export default function Button({
  children,
  type,
  onClick,
  bgColor,
  textColor,
}) {
  if (bgColor === undefined) {
    bgColor = "bg-white";
  }
  if (textColor === undefined) {
    textColor = "text-gray-900";
  }

  return (
    <button
      type={type}
      className={`rounded-md ${bgColor} px-3.5 py-2.5 text-sm font-semibold ${textColor} shadow-sm ring-1 ring-inset ring-gray-300 lg:hover:bg-blue-500 hover:text-white`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
