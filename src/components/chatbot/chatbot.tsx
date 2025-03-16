'use client'
import React, { useState, useRef, useEffect } from "react";
import { Send, ChevronDown, ChevronUp, Sparkles, X, Paperclip, User, Bot } from "lucide-react";

interface Message {
  text: string;
  sender: "user" | "bot";
  isError?: boolean;
  isTyping?: boolean;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey there 👋\nHow can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = (): void => setIsOpen(!isOpen);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  const showTypingIndicator = (): void => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1500 + Math.random() * 1000);
  };

  const sendMessage = async (): Promise<void> => {
    if (!input.trim()) return;
    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    showTypingIndicator();

    try {
      const response = await fetch("http://localhost:3000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: input })
      });
      
      if (!response.body) {
        throw new Error("Response body is null");
      }
      
      const reader = response.body.getReader();
      let botMessage = "";
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        botMessage += new TextDecoder().decode(value);
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage?.sender === "bot" && !lastMessage.isTyping) {
            newMessages[newMessages.length - 1] = { text: botMessage, sender: "bot" };
          } else {
            newMessages.push({ text: botMessage, sender: "bot" });
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, { text: "Sorry, I couldn't process that request.", sender: "bot", isError: true }]);
    }
    
    setLoading(false);
  };

  // Quick suggestions that user can click
  const suggestions: string[] = ["Help me with farming", "Best crops for summer", "Soil analysis tips"];

  const handleSuggestionClick = (suggestion: string): void => {
    setInput(suggestion);
    setTimeout(() => void sendMessage(), 100);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full sm:w-80">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl border border-purple-800/30">
        {/* Header */}
        <div 
          className="bg-purple-600 p-3 flex items-center justify-between cursor-pointer"
          onClick={toggleChat}
        >
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-lg p-1 flex items-center justify-center">
              <Sparkles size={16} className="text-purple-600" />
            </div>
            <span className="text-white font-medium">AI Assistant</span>
          </div>
          <div className="flex items-center space-x-2">
            {isOpen && (
              <button 
                onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
                  e.stopPropagation();
                  setMessages([{ text: "Hey there 👋\nHow can I help you today?", sender: "bot" }]);
                }}
                className="text-white/70 hover:text-white focus:outline-none"
              >
                <X size={16} />
              </button>
            )}
            <button className="text-white focus:outline-none">
              {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
          </div>
        </div>
        
        {/* Chat area */}
        {isOpen && (
          <>
            <div 
              className="bg-gray-900 h-64 overflow-y-auto p-3 space-y-3"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#6b21a8 #1f2937"
              }}
            >
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.sender === "bot" && (
                    <div className="h-6 w-6 rounded-lg bg-purple-600 flex items-center justify-center mr-2 flex-shrink-0">
                      <Bot size={12} className="text-white" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      msg.sender === "user" 
                        ? "bg-purple-500 text-white rounded-br-none" 
                        : msg.isError
                          ? "bg-red-500/20 text-red-200 border border-red-500/30"
                          : "bg-gray-800 text-gray-200 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === "user" && (
                    <div className="h-6 w-6 rounded-lg bg-purple-500 flex items-center justify-center ml-2 flex-shrink-0">
                      <User size={12} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="h-6 w-6 rounded-lg bg-purple-600 flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="bg-gray-800 text-gray-200 rounded-lg rounded-bl-none px-3 py-2 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: "0ms"}}></div>
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: "150ms"}}></div>
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: "300ms"}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="px-3 pb-2 pt-1 flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-1 rounded-md transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            
            {/* Input area */}
            <div className="p-3 bg-gray-800 border-t border-gray-700">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message..."
                  className="w-full bg-gray-700 text-sm text-gray-200 rounded-md pl-3 pr-16 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-400"
                />
                <div className="absolute right-1 flex items-center">
                  <button 
                    className="p-1 rounded-md text-gray-400 hover:text-gray-300 mr-1"
                    title="Attach file"
                  >
                    <Paperclip size={16} />
                  </button>
                  <button 
                    onClick={() => void sendMessage()} 
                    disabled={!input.trim() || loading}
                    className={`p-1.5 rounded-md ${
                      !input.trim() || loading 
                        ? "bg-gray-600 text-gray-400" 
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    <Send size={14} className="" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        /* Custom scrollbar styles */
        div::-webkit-scrollbar {
          width: 6px;
        }
        
        div::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 3px;
        }
        
        div::-webkit-scrollbar-thumb {
          background: #6b21a8;
          border-radius: 3px;
          border: 1px solid #1f2937;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: #7e22ce;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;