import React from 'react';

const Navbar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md py-3 flex justify-around items-center">
      <a href="ai.html" className="flex flex-col items-center text-gray-500 hover:text-black">
        <div
          className="w-8 h-8 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: "url('ai.png')" }}
        />
      </a>
      <a href="inventory.html" className="flex flex-col items-center text-gray-500 hover:text-black">
        <i className="fa-solid fa-box text-2xl" />
      </a>
      <a href="khetai.html" className="flex flex-col items-center text-green-600">
        <div
          className="w-8 h-8 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: "url('KhetAI\\ Logo.png')" }}
        />
      </a>
      <a href="community.html" className="flex flex-col items-center text-gray-500 hover:text-black">
        <i className="fa-solid fa-users text-2xl" />
      </a>
      <a href="profile.html" className="flex flex-col items-center text-gray-500 hover:text-black">
        <i className="fa-solid fa-user text-2xl" />
      </a>
    </div>
  );
};

export default Navbar;
