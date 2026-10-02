import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const DeleteModal = ({ isOpen, product, onClose, onConfirm,isDeleting }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
        <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Delete Product?</h3>
        <p className="text-sm text-slate-500 mt-2">
          Are you sure you want to delete <span className="font-semibold text-slate-800">"{product.title}"</span>? This action cannot be undone.
        </p>

        <div className="mt-6 flex items-center space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            disabled={isDeleting}
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold transition shadow-sm"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};