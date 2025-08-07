// app/components/Chatbot.tsx
'use client'; // This is a Client Component

import React, { useState } from 'react';

// Define a type for the chat messages
interface Message {
  role: 'user' | 'model';
    text: "I'm Rose, an AI assistant. I'm here to provide information about the company and answer any of your questions.",

}

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send the user's message to our secure API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server.');
      }

      const data = await response.json();
      const modelMessage: Message = { role: 'model', text: data.text };
      setMessages((prev) => [...prev, modelMessage]);

    } catch (error) {
      console.error(error);
      const errorMessage: Message = { role: 'model', text: 'Sorry, something went wrong. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2>Chat with Rose</h2>
      <div className="flex-1 overflow-y-auto p-4 border rounded-md my-2">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {isLoading && <div className="text-left"><span className="inline-block p-2 rounded-lg bg-gray-200">...</span></div>}
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l-md"
          placeholder="Ask something..."
          disabled={isLoading}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
};