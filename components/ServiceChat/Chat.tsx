'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'agent';
}

const presetQuestions = [
  "How do I reset my password?",
  "What are your business hours?",
  "How can I track my order?",
  "Do you offer refunds?"
];

export default function CustomerServiceChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm the customer service assistant. How can I help you today?", sender: 'agent' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isPresetExpanded, setIsPresetExpanded] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (text.trim() === '') return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: text,
      sender: 'user'
    };

    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputMessage('');

    // Simulate agent reply
    setTimeout(() => {
      const agentReply: Message = {
        id: messages.length + 2,
        text: "Thank you for your question. We're processing your inquiry, please wait a moment.",
        sender: 'agent'
      };
      setMessages(prevMessages => [...prevMessages, agentReply]);

      // Scroll to bottom
      const scrollArea = scrollAreaRef.current;
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[90vh] sm:h-[600px] w-full sm:w-[450px] md:w-[550px] border rounded-lg shadow-lg bg-[#3E2A0F] text-[#F5E6D3]">
      <div className="bg-[#FFCD4D] text-[#3E2A0F] p-4 rounded-t-lg flex justify-between items-center">
        <h2 className="text-xl font-bold">Customer Service Chat</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-[#FFE0A3] text-[#3E2A0F]">
          <X className="h-4 w-4" />
          <span className="sr-only">Close chat</span>
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-3" ref={scrollAreaRef}>
          <Card className={`mb-4 bg-[#5D4B2C] border-[#FFCD4D] border transition-all duration-300 ${isPresetExpanded ? 'max-h-[210px]' : 'h-[48px]'} overflow-hidden`}>
            <CardHeader className="py-2 px-3 flex flex-row items-center justify-between space-y-0 border-b border-[#FFCD4D]">
              <CardTitle className="text-sm font-medium text-[#FFCD4D]">Common Questions</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 hover:bg-[#7A6236] text-[#FFCD4D]"
                onClick={() => setIsPresetExpanded(!isPresetExpanded)}
              >
                {isPresetExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {isPresetExpanded ? 'Collapse' : 'Expand'} common questions
                </span>
              </Button>
            </CardHeader>
            <CardContent className={`py-2 px-3 overflow-y-auto transition-all duration-300 ${isPresetExpanded ? 'max-h-[162px]' : 'max-h-0'}`}>
              {isPresetExpanded && (
                <div className="flex flex-col space-y-2">
                  {presetQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(question)}
                      className="justify-start bg-[#7A6236] text-[#F5E6D3] hover:bg-[#8F7A4F] border-[#FFCD4D] whitespace-normal text-left h-auto py-1.5 px-2 text-xs"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          <div className="flex-grow overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-[#FFCD4D] text-[#3E2A0F]'
                      : 'bg-[#5D4B2C] text-[#F5E6D3]'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-[#FFCD4D]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputMessage);
          }}
          className="flex items-center"
        >
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow mr-2 bg-[#5D4B2C] text-[#F5E6D3] border-[#FFCD4D] focus:ring-[#FFCD4D] focus:border-[#FFCD4D]"
          />
          <Button type="submit" size="icon" className="bg-[#FFCD4D] text-[#3E2A0F] hover:bg-[#FFE0A3]">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}