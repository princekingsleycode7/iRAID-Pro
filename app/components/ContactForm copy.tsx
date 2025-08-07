import React, { useState, FormEvent } from 'react';

export const ContactForm: React.FC = () => {
    const [contactInfo, setContactInfo] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log({ contactInfo, message });
        setIsSubmitted(true);
        setContactInfo('');
        setMessage('');
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    if (isSubmitted) {
        return (
            <div className="w-full max-w-md text-center p-8 bg-green-50 border border-green-200 rounded-xl">
                <h2 className="text-2xl font-bold text-green-800">Thank you!</h2>
                <p className="text-green-600 mt-2">Your message has been sent. We'll get back to you within 24 hours.</p>
            </div>
        )
    }

    return (
        <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-slate-800 text-center">Send a message</h2>
            <p className="text-slate-500 text-center mt-2 mb-8">We typically respond in less than 24hrs.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="contactInfo" className="block text-sm font-medium text-slate-700 mb-1">
                        Email or Phone
                    </label>
                    <input
                        type="text"
                        id="contactInfo"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-3 bg-slate-100 text-slate-900 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                        Message
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we help you?"
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-slate-100 text-slate-900 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y transition-all"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-colors"
                        disabled={!contactInfo || !message}
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};