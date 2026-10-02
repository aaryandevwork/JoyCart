import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { ProductCard } from "../components/ProductCard";
import { ProductModal } from "../components/ProductModel";
import { DeleteModal } from "../components/DeleteModel";
import { INITIAL_PRODUCTS } from "../mockData";
import { Package, AlertCircle, Shirt } from "lucide-react";
import { useProductHook } from "../hooks/useProductHook";

const HomePage = ({ user, onLogout }) => {
  const { getAllProducts, addProduct, updateProduct, deleteProducts } =
    useProductHook();

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Statistics
  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => {
    const stock =
      p.sizes?.reduce((acc, s) => acc + (Number(s.stock) || 0), 0) || 0;
    return stock > 0 && stock <= 10;
  }).length;

  const outOfStockCount = products.filter((p) => {
    const stock =
      p.sizes?.reduce((acc, s) => acc + (Number(s.stock) || 0), 0) || 0;
    return stock === 0;
  }).length;

  // Handlers
  const handleOpenAdd = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (productToEdit) {
        await updateProduct(productToEdit._id, productData);
      } else {
        await addProduct(productData);
      }

      await fetchProducts();

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (productToDelete) {
        await deleteProducts(productToDelete._id);
        await fetchProducts();
      }
    } catch (error) {
      console.error("Error handleConfirmDelete:", error);
    }
    setIsDeleteModalOpen(false);
  };

  const fetchProducts = async () => {
    const products = await getAllProducts();
    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar user={user} onOpenAddModal={handleOpenAdd} onLogout={onLogout} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Shirt className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">
                Total Items
              </p>
              <h4 className="text-2xl font-bold text-slate-900">
                {totalProducts}
              </h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">
                Low Stock
              </p>
              <h4 className="text-2xl font-bold text-slate-900">
                {lowStockCount}
              </h4>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">
                Out of Stock
              </p>
              <h4 className="text-2xl font-bold text-slate-900">
                {outOfStockCount}
              </h4>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-slate-900">
            Clothing Inventory Grid
          </h1>
          <span className="text-xs text-slate-500 font-medium">
            Showing {products.length} products
          </span>
        </div>

        {/* Product Cards Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <Shirt className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              No Clothing Products Found
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Get started by adding your first store item.
            </p>
            <button
              onClick={handleOpenAdd}
              className="mt-4 inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
            >
              Add Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <ProductModal
        isOpen={isModalOpen}
        productToEdit={productToEdit}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        product={productToDelete}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default HomePage;
