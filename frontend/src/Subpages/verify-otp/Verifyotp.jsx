import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";
const VerifyOTP =()=>{
  const [code, setCode] = useState(["", "", "", "","",""]); // Stores individual digits of the code
  const [isCodeSent, setIsCodeSent] = useState(false); // State to track if the code is sent
const navigate=useNavigate()
  const {error,isLoading,verifyEmail}=userAuthStore()
  // Refs for each input field to manage focus
  const inputRefs = useRef([]);

  // Handle input change for each field
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Check if the value is a number and update the state
    if (/[^0-9]/.test(value)) return; // Reject non-digit input

    const newCode = [...code];
    newCode[index] = value.slice(0, 1); // Only allow one digit per input
    setCode(newCode);

    // Move focus to the next input field if the current one is filled
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Send Code button click
  const handleSendCode = async(e) => {
    e.preventDefault()
    // You can perform the logic to send the code here
    setIsCodeSent(true); // Mark the code as sent
    console.log(code)
    const verificationCode=code.join('')
   
    try {
      await verifyEmail(verificationCode)
      toast.success("email verfy successful")

      navigate("/")
    } catch (error) {
      console.log(error)
      throw error;
    }

  };

  return (
    <div className="flex justify-center items-center h-screen   bg-[url('/images/wallpaper/phonesignup.png')] sm:bg-[url('/images/wallpaper/tabsignup.png')] md:bg-[url('/images/wallpaper/pcsignup.png')]">
      <div className=" rounded-lg shadow-lg w-96 p-[40px]  m-[20px] backdrop-blur-sm border-4 border-green-500">
        <h2 className="text-3xl font-bold text-center mb-6 	" >Verification Code</h2>
      <p className="text-slate-500"> Please type the verification code sent to your gmail</p>
        <div className="flex justify-between mb-4 mt-[4vh]">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              maxLength={1}
              className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              inputMode="numeric" // Helps mobile devices show numeric keypad
              ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input field
            />
          ))}
        </div>

        <div className="text-center">
          {error && <p className="text-red-500 mt-2">{error}</p>
          }
          <button
            onClick={handleSendCode}
            className="w-full py-2 mt-4 text-white bg-orange-500 rounded-lg hover:bg-blue-600"
          >
            {isCodeSent ? "Code Sent" : "Send Code"}
          </button>
          <p className="text-slate-400 mt-[3vh] text-nowrap"> i don't receive a code! <Link to="#" className="text-green-500"> Please resend</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
