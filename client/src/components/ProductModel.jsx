import React, { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";

export const ProductModal = ({ isOpen, productToEdit, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    currency: "INR",
    published: false,
    seller: "",
    images: [],
    sizes: [{ size: "M", stock: 10 }],
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        title: productToEdit.title || "",
        description: productToEdit.description || "",
        amount: productToEdit.price?.amount?.toString() || "",
        currency: productToEdit.price?.currency || "INR",
        published: Boolean(productToEdit.published),
        seller: productToEdit.seller || "",
        images: [],
        sizes: productToEdit.sizes?.length
          ? productToEdit.sizes
          : [{ size: "M", stock: 10 }],
      });
    } else {
      setFormData({
        title: "",
        description: "",
        amount: "",
        currency: "INR",
        published: false,
        seller: "",
        images: [],
        sizes: [{ size: "M", stock: 10 }],
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSizeChange = (index, field, value) => {
    const updated = [...formData.sizes];
    updated[index][field] = value;
    setFormData({ ...formData, sizes: updated });
  };

  const addSizeRow = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, { size: "L", stock: 5 }],
    });
  };

  const removeSizeRow = (index) => {
    if (formData.sizes.length === 1) return;
    setFormData({
      ...formData,
      sizes: formData.sizes.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);

    data.append(
      "price",
      JSON.stringify({
        amount: Number(formData.amount) || 0,
        currency: formData.currency,
      }),
    );

    data.append("published", formData.published);
    data.append("seller", formData.seller);

    data.append(
      "sizes",
      JSON.stringify(
        formData.sizes.map((s) => ({
          size: s.size,
          stock: Number(s.stock) || 0,
        })),
      ),
    );

    formData.images.forEach((image) => {
      data.append("images", image);
    });

    onSave(data);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <h3 className="font-bold text-lg">
            {productToEdit ? "Edit Product" : "Add New Product"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. myCaraa"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Enter product description..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm resize-none"
            />
          </div>

          {/* Price Object */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Price Amount
              </label>
              <input
                type="number"
                min="0"
                required
                placeholder="300"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value })
                }
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm bg-white"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
          </div>

          {/* Images List */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Product Images
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setFormData({
                  ...formData,
                  images: Array.from(e.target.files || []),
                })
              }
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 
               focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
               outline-none text-sm"
            />
          </div>

          {/* Sizes & Stock Embedded Array */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase">
                Sizes & Stock
              </label>
              <button
                type="button"
                onClick={addSizeRow}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Size
              </button>
            </div>

            <div className="space-y-2 max-h-36 overflow-y-auto p-1">
              {formData.sizes.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Size (e.g. M)"
                    value={item.size}
                    onChange={(e) =>
                      handleSizeChange(index, "size", e.target.value)
                    }
                    className="w-1/2 px-3 py-1.5 rounded-lg border border-slate-300 text-sm"
                  />
                  <input
                    type="number"
                    min="0"
                    required
                    placeholder="Stock"
                    value={item.stock}
                    onChange={(e) =>
                      handleSizeChange(index, "stock", e.target.value)
                    }
                    className="w-1/2 px-3 py-1.5 rounded-lg border border-slate-300 text-sm"
                  />
                  {formData.sizes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSizeRow(index)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Published Checkbox */}
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <label
              htmlFor="published"
              className="text-sm font-semibold text-slate-700 cursor-pointer"
            >
              Publish Product (Visible in Store)
            </label>
          </div>

          {/* Footer Buttons */}
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
              {productToEdit ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
