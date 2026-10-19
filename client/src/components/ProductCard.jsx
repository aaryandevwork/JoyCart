
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
      return <span className="px-2.5 py-1 text-xs font-semibold bg-(--theme-rose-100) text-(--theme-rose-700) rounded-full">Out of Stock</span>;
    }
    if (stock <= 10) {
      return <span className="px-2.5 py-1 text-xs font-semibold bg-(--theme-amber-100) text-(--theme-amber-800) rounded-full">Low Stock ({stock})</span>;
    }
    return <span className="px-2.5 py-1 text-xs font-semibold bg-(--theme-emerald-100) text-(--theme-emerald-800) rounded-full">In Stock ({stock})</span>;
  };

  return (
    <div className="bg-(--theme-surface) rounded-2xl border border-(--theme-border) shadow-sm hover:shadow-md transition duration-200 overflow-hidden flex flex-col group">
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-(--theme-surface-muted) overflow-hidden">
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
            product.published ? 'bg-(--theme-emerald-900)/80 text-(--theme-emerald-100)' : 'bg-(--theme-text)/80 text-(--theme-surface-muted)'
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
          <h3 className="text-base font-bold text-(--theme-text) line-clamp-1">{product.title}</h3>
          <p className="text-xs text-(--theme-text-muted) mt-1 line-clamp-2 leading-relaxed">{product.description}</p>
          
          <div className="mt-3 flex items-center justify-between">
            <span className="text-2xl font-extrabold text-(--theme-text)">
              {product.price?.currency === 'INR' ? '₹' : '$'}
              {product.price?.amount ?? 0}
            </span>
          </div>

          {/* Embedded Sizes and Stock Pills */}
          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
            <Layers className="w-3.5 h-3.5 text-(--theme-text-muted) mr-1" />
            {product.sizes?.map((item, idx) => (
              <span key={item._id || idx} className="text-[11px] font-semibold bg-(--theme-surface-muted) text-(--theme-text) px-2 py-0.5 rounded border border-(--theme-border)">
                {item.size}: <span className="text-(--theme-primary) font-bold">{item.stock}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-4 border-t border-(--theme-border) grid grid-cols-2 gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 bg-(--theme-surface-muted) hover:bg-(--theme-accent) hover:text-(--theme-accent-text) text-(--theme-text) rounded-lg text-xs font-semibold transition"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(product)}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 bg-(--theme-surface-muted) hover:bg-(--theme-rose-100) hover:text-(--theme-danger) text-(--theme-text) rounded-lg text-xs font-semibold transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>

      </div>
    </div>
  );
};