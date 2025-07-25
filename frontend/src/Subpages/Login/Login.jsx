import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userAuthStore } from '../../store/authStore';
import { Loader } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
   
  });
  const { login, isLoading, error } = userAuthStore();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen ">
      <div className="w-[90vw] md:w-[60vw] bg-white shadow-lg rounded-2xl p-6 md:p-10 border-4 border-[#4cc813]">
        <h2 className="text-[#2c98a0] font-bold text-4xl text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <label className="text-[#2c98a0] text-lg font-medium">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-[#4cc813] p-2 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-[#67dba5]"
            placeholder="example@gmail.com"
            required
          />
          
          <label className="text-[#2c98a0] text-lg font-medium mt-4">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-2 border-[#4cc813] p-2 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-[#67dba5]"
            placeholder="******"
            required
          />
          
          <Link to="/forget-password" className="text-center text-[#38b2a3] mt-4">Forgot password?</Link>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          
          <button
            type="submit"
            className="mt-4 bg-[#4cc813] text-white rounded-full p-3 text-xl hover:bg-[#67dba5] transition-all duration-300"
            disabled={isLoading}>
            {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
          </button>
        </form>
        
        <p className="text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-[#38b2a3] font-semibold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
