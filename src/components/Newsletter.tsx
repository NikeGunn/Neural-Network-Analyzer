import React, { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email to confirm.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
      <p className="text-gray-400 mb-4">
        Subscribe to our newsletter for the latest updates and features.
      </p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 
                     text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent transition-all duration-200"
            disabled={status === 'loading' || status === 'success'}
          />
          {status === 'success' && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success' || !email}
          className="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 
                   disabled:bg-gray-700 disabled:cursor-not-allowed
                   text-white font-medium transition-all duration-200
                   flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Subscribing...
            </>
          ) : status === 'success' ? (
            'Subscribed!'
          ) : (
            'Subscribe'
          )}
        </button>
        {message && (
          <p className={`text-sm ${
            status === 'success' ? 'text-green-400' : 'text-red-400'
          }`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};