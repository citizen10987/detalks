
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Shield, Clock, Check, CheckCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
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
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const formatTime = () => {
    const now = new Date();
    return `${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
  };
  
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { 
        id: Date.now(), 
        text: message, 
        isUser: true,
        timestamp: formatTime(),
        status: 'sent' as const
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate message delivery status after short delays
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => msg.id === newMessage.id ? {...msg, status: 'delivered' as const} : msg)
        );
      }, 1000);
      
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => msg.id === newMessage.id ? {...msg, status: 'read' as const} : msg)
        );
      }, 2000);
    }
  };
  
  const renderMessageStatus = (status?: string) => {
    if (!status) return null;
    
    switch(status) {
      case 'sent':
        return <Check size={14} className="text-gray-400" />;
      case 'delivered':
        return <CheckCheck size={14} className="text-gray-400" />;
      case 'read':
        return <CheckCheck size={14} className="text-blue-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="page-container bg-gray-50 dark:bg-gray-900">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 shadow-sm p-4">
        <div className="flex items-center">
          <Link to="/professional" className="mr-4">
            <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </div>
          </Link>
          <div>
            <h1 className="text-xl font-semibold">Dr. Emily Johnson</h1>
            <div className="flex items-center text-xs text-green-600">
              <Shield size={12} className="mr-1" />
              <span>Encrypted & Private</span>
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
              <div className={`max-w-[80%] rounded-2xl p-3 ${
                msg.isUser 
                  ? 'bg-icon-purple text-white rounded-tr-none' 
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-700'
              }`}>
                <div className="text-sm">{msg.text}</div>
                <div className={`flex items-center justify-end mt-1 space-x-1 text-xs ${
                  msg.isUser ? 'text-white/70' : 'text-gray-500'
                }`}>
                  <span>{msg.timestamp}</span>
                  {msg.isUser && renderMessageStatus(msg.status)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <input 
            type="text"
            className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 border-0 rounded-full focus:ring-2 focus:ring-icon-purple dark:focus:ring-icon-purple-light"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            className={`p-3 rounded-full transition-colors ${
              message.trim() 
                ? 'bg-icon-purple text-white hover:bg-icon-purple/90 active:bg-icon-purple/80' 
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

export default SecureChat;
