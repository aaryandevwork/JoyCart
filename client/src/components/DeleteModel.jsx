
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const DeleteModal = ({ isOpen, product, onClose, onConfirm, isDeleting }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-(--theme-text)/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-(--theme-surface) rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
        <div className="w-12 h-12 bg-(--theme-rose-100) text-(--theme-danger) rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-(--theme-text)">Delete Product?</h3>
        <p className="text-sm text-(--theme-text-muted) mt-2">
          Are you sure you want to delete <span className="font-semibold text-(--theme-text)">"{product.title}"</span>? This action cannot be undone.
        </p>

        <div className="mt-6 flex items-center space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-(--theme-border) text-(--theme-text) text-sm font-semibold hover:bg-(--theme-surface-muted) transition"
          >
            Cancel
          </button>
          <button
            disabled={isDeleting}
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-lg bg-(--theme-danger) hover:bg-(--theme-rose-700) text-white text-sm font-semibold transition shadow-sm"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};