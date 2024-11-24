import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fetchProducts as fetchProductsFromApi } from '../services/api'; // Предполагаем, что API уже настроен

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
  reloadProducts: () => void; // Метод для повторной загрузки продуктов
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Загрузка данных из базы данных
  const loadProducts = async () => {
    try {
      const fetchedProducts = await fetchProductsFromApi();
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts); // По умолчанию отображаем все продукты
    } catch (error) {
      console.error('Ошибка при загрузке продуктов:', error);
    }
  };

  useEffect(() => {
    loadProducts(); // Загружаем продукты при монтировании компонента
  }, []);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
    setFilteredProducts((prev) => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setFilteredProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    setFilteredProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const filterProducts = (filter: 'all' | 'available' | 'inProduction') => {
    if (filter === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.status === filter)
      );
    }
  };

  const reloadProducts = () => {
    loadProducts(); // Повторная загрузка продуктов из API
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
        reloadProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
