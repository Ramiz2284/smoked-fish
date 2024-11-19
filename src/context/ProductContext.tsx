// src/context/ProductContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  status: 'available' | 'inProduction';
};

type ProductContextType = {
  products: Product[];
  filteredProducts: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (id: string) => void;
  filterProducts: (filter: 'all' | 'available' | 'inProduction') => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Копченый лосось',
      price: 1200,
      description: 'Свежий копченый лосось',
      image: 'https://via.placeholder.com/150',
      status: 'available',
    },
    {
      id: '2',
      name: 'Копченая скумбрия',
      price: 900,
      description: 'В процессе производства',
      image: 'https://via.placeholder.com/150',
      status: 'inProduction',
    },
  ]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const addProduct = (product: Product) =>
    setProducts((prev) => [...prev, product]);
  const updateProduct = (updatedProduct: Product) =>
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  const deleteProduct = (id: string) =>
    setProducts((prev) => prev.filter((product) => product.id !== id));
  const filterProducts = (filter: 'all' | 'available' | 'inProduction') => {
    if (filter === 'all') setFilteredProducts(products);
    else
      setFilteredProducts(
        products.filter((product) => product.status === filter)
      );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        filterProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error('useProductContext must be used within a ProductProvider');
  return context;
};
