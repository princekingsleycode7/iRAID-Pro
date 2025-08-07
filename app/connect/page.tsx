"use client"

import React from 'react';
import { Chatbot } from  '../components/Chatbot';
// import { Chatbot } from '    './components/Chatbot';
import { ContactForm } from '../components/ContactForm';

const App: React.FC = () => {
  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center p-4 font-sans">
      <main className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden my-8">
        
        <div className="w-full md:w-1/2 p-6 flex flex-col">
          <Chatbot />
        </div>

        <div className="flex items-center justify-center my-4 md:my-0 md:mx-0">
            <div className="w-full h-px md:w-px md:h-full bg-slate-200"></div>
            <span className="absolute bg-slate-100 text-slate-500 font-medium px-3 py-1 rounded-full border border-slate-200 text-sm">OR</span>
        </div>

        <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
          <ContactForm />
        </div>

      </main>
    </div>
  );
};

export default App;
