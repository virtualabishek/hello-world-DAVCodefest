import { NavLink } from "react-router-dom";
export default function NonLoggedUser() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5 text-center">
        <div className="bg-green-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Welcome to Our Platform</h2>
          <p className="text-lg mb-6">Please log in or sign up to continue.</p>
          <div className="flex justify-center gap-4">
            <NavLink to="/login" className="bg-green-600 text-white px-4 py-2 rounded-md text-lg hover:bg-green-600 transition">Login</NavLink>
            <NavLink to="/signup" className="bg-green-600 text-white px-4 py-2 rounded-md text-lg hover:bg-green-600 transition">Sign Up</NavLink>
          </div>
        </div>
      </div>
    );
  }
  