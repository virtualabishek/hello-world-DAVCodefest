import {
  EllipsisVerticalIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  SparklesIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import remarkGfm from "remark-gfm";
import { userAuthStore } from "../store/authStore";

function stripThinkSection(text) {
  return text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
}

const Chat = () => {
  const { user } = userAuthStore();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "AI",
      message: "Hello! How can I assist you with your farming today?",
      image: "/images/logo.png",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const getAIResponse = async (input) => {
    try {
      const responses = await axios.post(
        "http://localhost:7180/ai/text",
        { input },
        { withCredentials: true }
      );
      if (responses.data) {
        return responses.data.chatCompletion;
      } else {
        return "I'm not sure how to respond to that. Please try again.";
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "I'm having trouble connecting. Please try again.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (userInput.trim() && user) {
      const newUserMessage = {
        id: Date.now(),
        sender: "User",
        message: userInput,
        image: user.avatar,
      };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setIsLoading(true);
      setUserInput("");

      const aiResponse = await getAIResponse(userInput);
      const cleanedResponse = stripThinkSection(aiResponse);
      const newAIMessage = {
        id: Date.now() + 1,
        sender: "AI",
        message: cleanedResponse,
        image: "/images/logo.png",
      };
      setMessages((prevMessages) => [...prevMessages, newAIMessage]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex h-screen flex-col bg-slate-100">
      <header className="flex-shrink-0 flex items-center justify-between border-b border-slate-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
              <SparklesIcon className="h-6 w-6 text-green-700" />
            </div>
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
          </div>
          <div>
            <h1 className="font-bold text-slate-800">sarakKrishi Assistant</h1>
            <p className="text-sm text-green-600">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100">
            <PhoneIcon className="h-6 w-6" />
          </button>
          <button className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100">
            <VideoCameraIcon className="h-6 w-6" />
          </button>
          <button className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100">
            <EllipsisVerticalIcon className="h-6 w-6" />
          </button>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === "User" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender !== "User" && (
                <img
                  src={msg.image}
                  className="h-10 w-10 rounded-full"
                  alt="ai avatar"
                />
              )}
              <div
                className={`max-w-xs sm:max-w-md lg:max-w-lg rounded-2xl px-4 py-2.5 shadow-sm ${
                  msg.sender === "User"
                    ? "rounded-br-none bg-green-600 text-white"
                    : "rounded-bl-none bg-white text-slate-800"
                }`}
              >
                <div className="prose prose-sm prose-slate max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.message}
                  </ReactMarkdown>
                </div>
              </div>
              {msg.sender === "User" && (
                <img
                  src={msg.image}
                  className="h-10 w-10 rounded-full object-cover"
                  alt="user avatar"
                />
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <img
                src="/images/logo.png"
                className="h-10 w-10 rounded-full"
                alt="ai avatar"
              />
              <div className="rounded-2xl rounded-bl-none bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 delay-0"></span>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 delay-150"></span>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 delay-300"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>

      <footer className="flex-shrink-0 border-t border-slate-200 bg-white p-2">
        <div className="mx-auto max-w-3xl">
          <form
            onSubmit={handleSendMessage}
            className="flex items-end gap-2 rounded-xl border border-slate-300 p-2 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500"
          >
            <TextareaAutosize
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder="Type your message..."
              className="w-full flex-1 resize-none border-none bg-transparent px-2 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0"
              minRows={1}
              maxRows={5}
              autoFocus
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-white shadow-sm transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
