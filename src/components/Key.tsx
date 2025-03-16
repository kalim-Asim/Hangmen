interface ButtonProps {
  value: string;
  disable: boolean;
  onClick: () => void
}
export const Key = ({ value, disable, onClick }: ButtonProps) => {
  return (
    <button
      className={`w-16 h-16 rounded-lg text-2xl ${
        disable ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 cursor-pointer"
      }`}
      disabled={disable}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
