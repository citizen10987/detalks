import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Shield, Check, CheckCheck, Lock, Paperclip, Mic, Image, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  images?: string[];
  audio?: string;
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
      
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now(),
            text: "Thank you for sharing that with me. I'm glad to hear you're making progress with the techniques we discussed. Would you like to schedule another session to go over some additional coping strategies?",
            isUser: false,
            timestamp: formatTime()
          }
        ]);
      }, 3000);
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

  const renderImageGallery = (images?: string[]) => {
    if (!images || images.length === 0) return null;
    
    return (
      <div className="flex gap-2 mt-2 flex-wrap">
        {images.map((img, index) => (
          <div key={index} className="w-24 h-24 rounded-lg overflow-hidden">
            <img src={img} alt="Shared content" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    );
  };

  const renderAudioMessage = (audio?: string) => {
    if (!audio) return null;
    
    return (
      <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-lg p-2 mt-2">
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <Mic size={16} className="text-white" />
        </div>
        <div className="mx-2 flex-1">
          <div className="flex-1 w-full h-8 flex items-center">
            <svg viewBox="0 0 200 40" className="w-full">
              <path 
                d="M0,20 Q10,5 20,20 T40,20 T60,20 T80,20 T100,20 T120,20 T140,20 T160,20 T180,20 T200,20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="text-icon-purple"
              />
            </svg>
          </div>
        </div>
        <div className="text-xs font-medium">{audio}</div>
      </div>
    );
  };
  
  return (
    <div className="page-container bg-white dark:bg-gray-900 p-0">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 shadow-sm p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/professional" className="mr-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
              </div>
            </Link>
            <div className="flex items-center">
              <Avatar className="h-10 w-10 border-2 border-[#F14C27]">
                <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Emily" />
                <AvatarFallback>EJ</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <h1 className="text-base font-semibold">Dr. Emily Johnson</h1>
                <div className="flex items-center">
                  <Lock size={12} className="text-[#F14C27] mr-1" />
                  <span className="text-xs text-[#F14C27] font-medium">End-to-end encrypted</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
                <path d="M15.6 11.6L22 7v10l-6.4-4.5v-1"></path>
                <path d="M4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col pt-20 pb-20 px-4">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-xs text-gray-600 dark:text-gray-400">
            Today
          </div>
        </div>
        
        <div className="space-y-4">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              {!msg.isUser && (
                <div className="mr-2 mt-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Emily" />
                    <AvatarFallback>EJ</AvatarFallback>
                  </Avatar>
                </div>
              )}
              
              <div className={`max-w-[75%] ${msg.isUser ? 'order-1' : 'order-2'}`}>
                <div 
                  className={`rounded-2xl py-2 px-3 ${
                    msg.isUser 
                      ? 'bg-[#F14C27] text-white rounded-br-none' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
                  }`}
                >
                  <div className="text-sm">{msg.text}</div>
                  {msg.images && renderImageGallery(msg.images)}
                  {msg.audio && renderAudioMessage(msg.audio)}
                </div>
                <div className={`flex items-center gap-1 ${msg.isUser ? 'justify-end' : 'justify-start'} mt-1`}>
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  {msg.isUser && renderMessageStatus(msg.status)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container max-w-4xl mx-auto p-3">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
            <div className="flex items-center">
              <Button size="icon" variant="ghost" className="rounded-full text-gray-500 hover:bg-transparent hover:text-gray-700 dark:hover:text-gray-300">
                <Paperclip size={20} />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full text-gray-500 hover:bg-transparent hover:text-gray-700 dark:hover:text-gray-300">
                <Image size={20} />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full text-gray-500 hover:bg-transparent hover:text-gray-700 dark:hover:text-gray-300">
                <Mic size={20} />
              </Button>
            </div>
            
            <Input 
              type="text"
              className="flex-1 px-4 py-2 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            
            <Button size="icon" variant="ghost" className="rounded-full text-gray-500 hover:bg-transparent hover:text-gray-700 dark:hover:text-gray-300">
              <Smile size={20} />
            </Button>
            
            <Button 
              size="icon"
              className={`rounded-full ${
                message.trim() 
                  ? 'bg-[#F14C27] hover:bg-[#F14C27]/90 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
              onClick={sendMessage}
              disabled={!message.trim()}
            >
              <Send size={20} />
            </Button>
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs text-[#F14C27] font-medium">Secure Professional Chat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureChat;
