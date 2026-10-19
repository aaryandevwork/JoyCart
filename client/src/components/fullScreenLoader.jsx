
import React from 'react';

export const FullScreenLoader = ({ text = 'Preparing your dashboard...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-(--theme-text)/40 backdrop-blur-sm">
      <div className="bg-(--theme-surface) px-8 py-6 rounded-2xl shadow-xl flex flex-col items-center space-y-4 border border-(--theme-border)">
        {/* Spinner */}
        <div className="w-10 h-10 border-3 border-(--theme-surface-muted) border-t-(--theme-primary) rounded-full animate-spin" />
        
        {/* Status Text */}
        <p className="text-sm font-bold text-(--theme-text) tracking-tight">
          {text}
        </p>
      </div>
    </div>
  );
};

export default FullScreenLoader;
