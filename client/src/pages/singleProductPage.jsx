import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Heart, 
  Share2, 
  CheckCircle2, 
  XCircle, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Minus,
  Plus
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useProduct } from '../hooks/useProduct';

export const SingleProductPage = () => {

  const navigate = useNavigate()

  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProduct(productId);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0] || "");
      setSelectedSize(product.sizes?.[0] || null);
      setQuantity(1);
    }
  }, [product]);

  if (isLoading) {
    return <div>Loading product...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const item = product;

  // Helper for Price Formatting
  const formatPrice = (priceObj) => {
    if (!priceObj) return '₹0';
    const symbol = priceObj.currency === 'INR' ? '₹' : '$';
    return `${symbol}${priceObj.amount}`;
  };

  const availableStock = selectedSize ? selectedSize.stock : 0;

  const handleQuantityChange = (type) => {
    if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === 'increase' && quantity < availableStock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
          onClick={() => navigate("/main")}
            className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Inventory</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2.5 rounded-xl border shadow-sm transition ${
                isWishlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 shadow-sm transition">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Details Grid */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col space-y-4">
            {/* Main Preview */}
            <div className="relative aspect-square rounded-2xl bg-slate-100 overflow-hidden border border-slate-100">
              <img
                src={selectedImage || item.images?.[0]}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600';
                }}
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1.5 backdrop-blur-md text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 ${
                  item.published ? 'bg-emerald-900/80 text-emerald-200' : 'bg-slate-900/80 text-slate-300'
                }`}>
                  {item.published ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {item.published ? 'Published' : 'Draft Mode'}
                </span>
              </div>
            </div>

            {/* Image Thumbnails */}
            {item.images && item.images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {item.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                      selectedImage === imgUrl ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Information & CTAs */}
          <div className="flex flex-col justify-between space-y-6">
            <div>

              {/* Title & Price */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">{item.title}</h1>

              <div className="mt-4 flex items-baseline space-x-3">
                <span className="text-3xl font-black text-slate-900">{formatPrice(item.price)}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Taxes Included</span>
              </div>

              {/* Description */}
              <div className="mt-6 border-t border-slate-100 pt-4">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Description</h3>
                <p className="text-sm text-slate-600 leading-relaxed break-words">{item.description}</p>
              </div>

              {/* Size Selection */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Select Size</h3>
                  {selectedSize && (
                    <span className={`text-xs font-semibold ${selectedSize.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {selectedSize.stock > 0 ? `${selectedSize.stock} in stock` : 'Out of stock'}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {item.sizes?.map((sizeObj) => {
                    const isSelected = selectedSize?.size === sizeObj.size;
                    const isOutOfStock = sizeObj.stock === 0;

                    return (
                      <button
                        key={sizeObj._id || sizeObj.size}
                        onClick={() => {
                          setSelectedSize(sizeObj);
                          setQuantity(1);
                        }}
                        className={`min-w-[54px] px-4 py-2.5 rounded-xl text-sm font-bold border transition flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
                            : isOutOfStock
                            ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span>{sizeObj.size}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-6">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Quantity</h3>
                <div className="inline-flex items-center border border-slate-200 bg-slate-50 rounded-xl p-1">
                  <button
                    onClick={() => handleQuantityChange('decrease')}
                    disabled={quantity <= 1}
                    className="p-2 rounded-lg bg-white text-slate-600 shadow-sm disabled:opacity-40"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 text-sm font-bold text-slate-800">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange('increase')}
                    disabled={quantity >= availableStock}
                    className="p-2 rounded-lg bg-white text-slate-600 shadow-sm disabled:opacity-40"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons & Value Props */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  disabled={availableStock === 0}
                  // onClick={() => onAddToCart && onAddToCart(item, selectedSize, quantity)}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-lg shadow-indigo-100 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  disabled={availableStock === 0}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white transition shadow-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-3 gap-2 pt-4 text-center border-t border-slate-100">
                <div className="flex flex-col items-center p-2">
                  <Truck className="w-5 h-5 text-indigo-600 mb-1" />
                  <span className="text-[11px] font-semibold text-slate-600">Fast Shipping</span>
                </div>
                <div className="flex flex-col items-center p-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-600 mb-1" />
                  <span className="text-[11px] font-semibold text-slate-600">Authentic Product</span>
                </div>
                <div className="flex flex-col items-center p-2">
                  <RotateCcw className="w-5 h-5 text-indigo-600 mb-1" />
                  <span className="text-[11px] font-semibold text-slate-600">7 Days Return</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default SingleProductPage;