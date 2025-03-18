
import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const SecureChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hello Sarah, I've received your latest assessment. How have you been feeling since our last session?", 
      isUser: false,
      timestamp: "10:30 AM"
    }
  ]);
  
  const formatTime = () => {
    const now = new Date();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
  };
  
  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { 
        id: Date.now(), 
        text: message, 
        isUser: true,
        timestamp: formatTime()
      }]);
      setMessage('');
    }
  };
  
  return (
    <div className="page-container">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-semibold">Dr. Emily Johnson</h1>
          <p className="text-xs text-green-600">Encrypted & Private</p>
        </div>
      </div>
      
      <div className="flex flex-col h-[calc(100vh-200px)]">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.isUser 
                  ? 'bg-mood-pink text-white ml-auto' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div>{msg.text}</div>
              <div className={`text-xs mt-1 ${msg.isUser ? 'text-white/70' : 'text-gray-500'}`}>
                {msg.timestamp}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input 
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            className="bg-mood-pink text-white p-2 rounded-lg"
            onClick={sendMessage}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecureChat;
