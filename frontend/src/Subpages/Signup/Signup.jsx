import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAuthStore } from '../../store/authStore';
import { Loader } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    number:'',
    image: null,
  });

  const { signup, error, isLoading } = userAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, image ,number} = formData;
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
        data.append('number', number);

    if (image) data.append('image', image);
    try {
      await signup(data);
      navigate('/verify-otp');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center w-[98vw] bg-white items-center  justify-center h-[94vh] ">
      <div className="mainContainer flex flex-col w-[90vw] m-[6px] backdrop-blur-sm border-4 border-green-500 p-[15px] rounded-[15px] md:w-[80vw] md:p-[30px] shadow-lg">
        <h2 className="text-black font-bold text-4xl">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col md:py-8  w-full">
          <span className="text-gray-600 text-md mt-2">Full Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border-2 border-green-600 transition duration-300 ease-in-out hover:border-green-400 p-2 rounded-md text-xl"
            placeholder="Suranjan / Ram etc"
            required
          />
          <span className="text-gray-600 text-md mt-4">E-mail</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-green-600 transition duration-300 ease-in-out hover:border-green-400 p-2 rounded-md text-xl"
            placeholder="****@gmail.com"
            required
          />
                    <span className="text-gray-600 text-md mt-4">Phone number</span>

           <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="border-2 border-[#4cc813] p-2 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-[#67dba5]"
            placeholder="9**********"
            required
          />
          <span className="text-gray-600 text-md mt-4">Avatar</span>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border-2 border-green-600 transition duration-300 ease-in-out hover:border-green-400 p-2 rounded-md text-xl"
          />
          <span className="text-gray-600 text-md mt-4">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-2 border-green-600 transition duration-300 ease-in-out hover:border-green-400 p-2 rounded-md text-xl"
            placeholder="*****"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="text-xl text-white rounded-[20px] bg-green-500 hover:bg-green-600 transition duration-300 w-full sm:w-[220px] p-3 self-center mt-8"
          >
            {isLoading ? <Loader className="animate-spin mx-auto" /> : 'Sign Up'}
          </button>
        </form>
        <p className="text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline">
            LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;