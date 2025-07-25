import { useState } from "react";

const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

export default function Chatting() {
    const [selectedUser, setSelectedUser] = useState(users[0]);
    const [messages, setMessages] = useState({
        1: [{ id: 1, sender: "friend", text: "Hey, what's up?" }],
        2: [],
        3: []
    });
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        const newMsg = { id: Date.now(), sender: "me", text: input };
        setMessages({
            ...messages,
            [selectedUser.id]: [...messages[selectedUser.id], newMsg]
        });
        setInput("");
    };

    return (
        <div className="h-[90vh] bg-gray-100 flex">
            <div className="w-1/3 bg-white border-r overflow-y-auto">
                <div className="p-4 font-bold text-lg border-b">Friends</div>
                {users.map(user => (
                    <div
                        key={user.id}
                        className={`p-4 cursor-pointer hover:bg-gray-100 ${selectedUser.id === user.id ? "bg-gray-200" : ""}`}
                        onClick={() => setSelectedUser(user)}
                    >
                        {user.name}
                    </div>
                ))}
            </div>

            <div className="flex-1 flex flex-col">
                <div className="p-4 border-b font-bold text-lg">
                    Chat with {selectedUser.name}
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {(messages[selectedUser.id] || []).map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`px-4 py-2 rounded-lg max-w-[70%] text-white text-sm ${msg.sender === "me" ? "bg-blue-500" : "bg-gray-400"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t flex gap-2">
                    <input
                        type="text"
                        className="flex-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        onClick={handleSend}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
