import React from 'react';

export const FullScreenLoader = ({ text = 'Preparing your dashboard...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white px-8 py-6 rounded-2xl shadow-xl flex flex-col items-center space-y-4 border border-slate-100">
        {/* Spinner */}
        <div className="w-10 h-10 border-3 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
        
        {/* Status Text */}
        <p className="text-sm font-bold text-slate-800 tracking-tight">
          {text}
        </p>
      </div>
    </div>
  );
};

export default FullScreenLoader;