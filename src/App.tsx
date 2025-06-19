import React from 'react';
import { JSONFormatter } from './components/JSONFormatter';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        {/* Main content */}
        <div className="relative z-10 py-8">
          <JSONFormatter />
        </div>
        
        {/* Footer */}
        <footer className="relative z-10 py-8 text-center text-gray-500">
          <p className="text-sm">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;