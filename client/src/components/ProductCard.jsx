import React from 'react';
import { Edit2, Trash2, Layers, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

export const ProductCard = ({ product, onEdit, onDelete }) => {

  const navigate = useNavigate();

  // Calculate total stock across all size variants
  const totalStock = product.sizes?.reduce((acc, curr) => acc + (Number(curr.stock) || 0), 0) || 0;
  const firstImage = product.images?.[0] || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600';

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
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          onClick={() => navigate(`/main/products/${product._id}`)}
          src={firstImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600';
          }}
        />
        
        {/* Published Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 backdrop-blur-md text-xs font-medium rounded-md shadow-sm flex items-center gap-1 ${
            product.published ? 'bg-emerald-900/80 text-emerald-200' : 'bg-slate-900/80 text-slate-300'
          }`}>
            {product.published ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
            {product.published ? 'Published' : 'Draft'}
          </span>
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          {getStockBadge(totalStock)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 line-clamp-1">{product.title}</h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{product.description}</p>
          
          <div className="mt-3 flex items-center justify-between">
            <span className="text-2xl font-extrabold text-slate-900">
              {product.price?.currency === 'INR' ? '₹' : '$'}
              {product.price?.amount ?? 0}
            </span>
          </div>

          {/* Embedded Sizes and Stock Pills */}
          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
            <Layers className="w-3.5 h-3.5 text-slate-400 mr-1" />
            {product.sizes?.map((item, idx) => (
              <span key={item._id || idx} className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                {item.size}: <span className="text-indigo-600 font-bold">{item.stock}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
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