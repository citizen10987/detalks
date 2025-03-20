
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const AiChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hello! I'm your AI wellness assistant. How can I help you today?", 
      isUser: false,
      timestamp: formatTime()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  
  function formatTime() {
    const now = new Date();
    return `${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
  }
  
  const sendMessage = () => {
    if (message.trim()) {
      // Add user message
      const newMessages = [
        ...messages, 
        { 
          id: Date.now(), 
          text: message, 
          isUser: true,
          timestamp: formatTime()
        }
      ];
      setMessages(newMessages);
      setMessage('');
      
      // Show typing indicator
      setIsTyping(true);
      
      // Simulate AI response after a short delay
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev, 
          { 
            id: Date.now(), 
            text: "I'm here to support your mental wellness journey. Let me know how I can assist you further.", 
            isUser: false,
            timestamp: formatTime()
          }
        ]);
      }, 1500);
    }
  };
  
  return (
    <div className="page-container bg-gray-50 dark:bg-gray-900">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 shadow-sm p-4">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </div>
          </Link>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-mood-purple flex items-center justify-center mr-2">
              <Bot size={18} className="text-icon-purple" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">AI Wellness Assistant</h1>
              <div className="flex items-center text-xs text-purple-600">
                <Sparkles size={12} className="mr-1" />
                <span>Powered by AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col mt-16 mb-20 px-1">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-xs text-gray-600 dark:text-gray-400">
            Today
          </div>
        </div>
        
        <div className="space-y-4">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl p-3 ${
                  msg.isUser 
                    ? 'bg-mood-purple text-icon-purple rounded-tr-none' 
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="text-sm">{msg.text}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 max-w-[80%] rounded-2xl p-3 rounded-tl-none border border-gray-200 dark:border-gray-700">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <input 
            type="text"
            className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 border-0 rounded-full focus:ring-2 focus:ring-mood-purple"
            placeholder="Ask me anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            className={`p-3 rounded-full transition-colors ${
              message.trim() 
                ? 'bg-mood-purple text-icon-purple hover:bg-mood-purple/90 active:bg-mood-purple/80' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            onClick={sendMessage}
            disabled={!message.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
