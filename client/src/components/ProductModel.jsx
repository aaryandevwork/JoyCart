import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

const CATEGORIES = ['T-Shirts', 'Outerwear', 'Jackets', 'Pants', 'Dresses', 'Shirts', 'Accessories'];
const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '30', '32', '34'];

export const ProductModal = ({ isOpen, productToEdit, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'T-Shirts',
    price: '',
    stock: '',
    color: '',
    image: '',
    sizes: []
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        title: productToEdit.title,
        category: productToEdit.category,
        price: productToEdit.price.toString(),
        stock: productToEdit.stock.toString(),
        color: productToEdit.color,
        image: productToEdit.image,
        sizes: productToEdit.sizes
      });
    } else {
      setFormData({
        title: '',
        category: 'T-Shirts',
        price: '',
        stock: '',
        color: '',
        image: '',
        sizes: ['M', 'L']
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const toggleSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title: formData.title,
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock, 10) || 0,
      color: formData.color || 'Standard',
      image: formData.image || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600',
      sizes: formData.sizes.length ? formData.sizes : ['M']
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <h3 className="font-bold text-lg">{productToEdit ? 'Edit Clothing Product' : 'Add New Clothing Product'}</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Product Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Vintage Denim Jacket"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Color Variant</label>
              <input
                type="text"
                placeholder="e.g. Washed Blue"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                placeholder="29.99"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Stock Quantity</label>
              <input
                type="number"
                min="0"
                required
                placeholder="10"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Image URL</label>
            <div className="relative">
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
              <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Available Sizes</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SIZES.map((size) => {
                const selected = formData.sizes.includes(size);
                return (
                  <button
                    type="button"
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold border transition ${
                      selected
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm"
            >
              {productToEdit ? 'Update Product' : 'Save Product'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};