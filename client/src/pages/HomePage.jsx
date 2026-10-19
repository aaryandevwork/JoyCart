
import React, { useState } from "react";
import { Navbar } from "../components/NavBar";
import { ProductCard } from "../components/ProductCard";
import { ProductModal } from "../components/ProductModel";
import { DeleteModal } from "../components/DeleteModel";
import { Package, AlertCircle, Shirt } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import FullScreenLoader from "../components/fullScreenLoader";

const HomePage = () => {
  const { productsQuery, addMutation, updateMutation, deleteMutation } =
    useProducts();

  const { data: products = [], isLoading, isError, error } = productsQuery;

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
        await updateMutation.mutateAsync({
          productId: productToEdit._id,
          productData,
        });
      } else {
        await addMutation.mutateAsync(productData);
      }

      setIsModalOpen(false);
      setProductToEdit(null);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteMutation.mutateAsync(productToDelete._id);

      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (isLoading) {
    return <FullScreenLoader text="Loading.." />;
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-(--theme-danger)">
        Failed to load products: {error?.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--theme-bg) flex flex-col">
      <Navbar onOpenAddModal={handleOpenAdd} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-(--theme-surface) p-5 rounded-2xl border border-(--theme-border) shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-(--theme-surface-muted) text-(--theme-primary) rounded-xl">
              <Shirt className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-(--theme-text-muted) uppercase">
                Total Items
              </p>
              <h4 className="text-2xl font-bold text-(--theme-text)">
                {totalProducts}
              </h4>
            </div>
          </div>

          <div className="bg-(--theme-surface) p-5 rounded-2xl border border-(--theme-border) shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-(--theme-accent) text-(--theme-accent-text) rounded-xl">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-(--theme-text-muted) uppercase">
                Low Stock
              </p>
              <h4 className="text-2xl font-bold text-(--theme-text)">
                {lowStockCount}
              </h4>
            </div>
          </div>

          <div className="bg-(--theme-surface) p-5 rounded-2xl border border-(--theme-border) shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-(--theme-surface-muted) text-(--theme-danger) rounded-xl">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-(--theme-text-muted) uppercase">
                Out of Stock
              </p>
              <h4 className="text-2xl font-bold text-(--theme-text)">
                {outOfStockCount}
              </h4>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-(--theme-text)">
            Clothing Inventory Grid
          </h1>
          <span className="text-xs text-(--theme-text-muted) font-medium">
            Showing {products.length} products
          </span>
        </div>

        {/* Product Cards Grid */}
        {products.length === 0 ? (
          <div className="bg-(--theme-surface) rounded-2xl border border-dashed border-(--theme-border) p-12 text-center">
            <Shirt className="w-12 h-12 text-(--theme-border) mx-auto mb-3" />
            <h3 className="text-base font-bold text-(--theme-text)">
              No Clothing Products Found
            </h3>
            <p className="text-sm text-(--theme-text-muted) mt-1">
              Get started by adding your first store item.
            </p>
            <button
              onClick={handleOpenAdd}
              className="mt-4 inline-flex items-center space-x-2 bg-(--theme-primary) text-(--theme-accent-text) px-4 py-2 rounded-lg text-sm font-semibold hover:bg-(--theme-primary-hover) transition"
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
        {addMutation.isError && (
          <p className="text-(--theme-danger)">Failed to add product.</p>
        )}
      </main>

      {/* Modals */}
      <ProductModal
        isOpen={isModalOpen}
        productToEdit={productToEdit}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        isSaving={addMutation.isPending || updateMutation.isPending}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        product={productToDelete}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
};

export default HomePage;