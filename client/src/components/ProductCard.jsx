import React from 'react';
import { Edit2, Trash2, Tag, Layers } from 'lucide-react';

export const ProductCard = ({ product, onEdit, onDelete }) => {
  const getStockBadge = (stock) => {
    if (stock === 0) {
      return <span className="px-2.5 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">Out of Stock</span>;
    }
    if (stock <= 10) {
      return <span className="px-2.5 py-1 text-xs font-semibold bg-amber-100 text-amber-800 rounded-full">Low Stock ({stock})</span>;
    }
    return <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">In Stock ({stock})</span>;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-200 overflow-hidden flex flex-col group">
      
      {/* Product Image & Badges */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600';
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium rounded-md shadow-sm">
            {product.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          {getStockBadge(product.stock)}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 line-clamp-1">{product.title}</h3>
          
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-2xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
            <div className="flex items-center text-xs text-slate-500 gap-1 bg-slate-100 px-2 py-1 rounded">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <span>{product.color}</span>
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
            <Layers className="w-3.5 h-3.5 text-slate-400 mr-1" />
            {product.sizes.map((size) => (
              <span key={size} className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Card Actions */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 rounded-lg text-xs font-semibold transition"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(product)}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 rounded-lg text-xs font-semibold transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>

      </div>
    </div>
  );
};