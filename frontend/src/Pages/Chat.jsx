"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { IoCall } from "react-icons/io5";
import { MdVideoCall } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { userAuthStore } from "../store/authStore";
const Chat = () => {
  const { user } = userAuthStore();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "AI",
      message: "Hello! How can I assist you today?",
      // image: "navbarimg/pic1.png",
      image:
        "https://img.icons8.com/?size=100&id=q7wteb2_yVxu&format=png&color=000000",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const getAIResponse = async (input) => {
    try {
      const responses = await axios.post(
        "http://localhost:7180/ai/text", // Replace with your API endpoint
        { input },
        { withCredentials: true }
      );

      console.log("API Response:", responses.data); // Debugging

      if (responses.data) {
        return responses.data.chatCompletion;
      } else {
        console.error("AI response is empty or invalid");
        return "I'm not sure how to respond to that. Please try again.";
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "I'm not sure how to respond to that. Please try again.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      const newUserMessage = {
        id: messages.length + 1,
        sender: "User",
        message: userInput,
        image: user.avatar,
      };
      setMessages([...messages, newUserMessage]);
      setIsLoading(true);
      setUserInput("");

      const aiResponse = await getAIResponse(userInput);
      const cleanedResponse = stripThinkSection(aiResponse); // <-- Clean response
      const newAIMessage = {
        id: messages.length + 2,
        sender: "AI",
        message: aiResponse,
        // image: "navbarimg/pic1.png",
        image:"https://img.icons8.com/?size=100&id=q7wteb2_yVxu&format=png&color=000000"
      };
      setMessages((prevMessages) => [...prevMessages, newAIMessage]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[100vh] bg-gray-100">
      <div className="flex-1 overflow-hidden">
        <div className="max-w-3xl mx-auto p-4 h-[87vh] flex flex-col justify-between">
          <div className="flex justify-between items-center bg-white rounded-t-xl shadow-md p-2 mb-2">
            <div>
              <h1 className="text-2xl font-bold  mb-4 text-gray-800">KhetAI</h1>
            </div>
            <div className="flex items-center gap-4 text-gray-500 text-2xl">
              <div>
                {" "}
                <IoCall />
              </div>
              <div>
                <MdVideoCall />
              </div>
              <div>
                <CiCircleMore />
              </div>
            </div>
          </div>
          <div
            ref={chatBoxRef}
            className="flex-1 overflow-y-auto  rounded-t-xl shadow-md p-4  bg-cover bg-center bg-opacity-50"
            // style={{ backgroundImage: "url('/vectorImg/chatbot.png')" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-center  w-full ${
                  msg.sender === "User" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-center gap-2 ${
                    msg.sender === "User" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <img
                    src={msg.image}
                    className="h-8 w-8 rounded-full"
                    alt="profile"
                  />
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 m-2 rounded-lg shadow-md ${
                      msg.sender === "User"
                        ? "bg-green-500 text-white"
                        : "bg-[#964B00] text-white"
                    }`}
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]} // Enable GFM support
                    >
                      {msg.message}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                  <p>AI is typing...</p>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSendMessage} className="mt-4 flex">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-white border outline-none border-gray-300 rounded-l-xl focus:outline-none resize-none"
              rows={3}
              autoFocus
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 bg-blue-500 text-white rounded-r-xl outline-none focus:outline-none ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

function stripThinkSection(text) {
  // Remove all <think>...</think> blocks (global, multiline)
  return text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
}

export default Chat;
