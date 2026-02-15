import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-black border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-400">
          ThinkBoard
        </Link>

        <Link
          to="/create"
          className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-full font-medium transition"
        >
          + New Note
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
