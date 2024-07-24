import { FaSpinner } from "react-icons/fa";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <FaSpinner className="h-16 w-16 text-blue-500 animate-spin" />
        <p className="text-gray-600 mt-4 text-xl">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
