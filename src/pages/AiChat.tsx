
import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const AiChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your AI wellness assistant. How can I help you today?", isUser: false }
  ]);
  
  const sendMessage = () => {
    if (message.trim()) {
      // Add user message
      const newMessages = [...messages, { id: Date.now(), text: message, isUser: true }];
      setMessages(newMessages);
      setMessage('');
      
      // Simulate AI response after a short delay
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { 
            id: Date.now(), 
            text: "I'm here to support your mental wellness journey. Let me know how I can assist you further.", 
            isUser: false 
          }
        ]);
      }, 1000);
    }
  };
  
  return (
    <div className="page-container">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-semibold">Talk to AI</h1>
      </div>
      
      <div className="flex flex-col h-[calc(100vh-200px)]">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.isUser 
                  ? 'bg-mood-purple text-white ml-auto' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.text}
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
            className="bg-mood-purple text-white p-2 rounded-lg"
            onClick={sendMessage}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
