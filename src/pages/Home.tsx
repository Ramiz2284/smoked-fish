import React, { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { fetchProducts } from '../services/api';
import styles from './Home.module.css';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  status: 'available' | 'inProduction';
};

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Копченая рыба в Анталии</h1>
      <div className={styles.productList}>
        {products.map((product) => (
          <ProductCard
            id={product.id}
            key={product._id} // Используйте уникальный ключ
            name={product.name}
            price={product.price}
            description={product.description}
            image={product.image}
            status={product.status}
          />
        ))}
      </div>
    </div>
  );
};
