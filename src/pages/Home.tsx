import React, { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { fetchProducts } from '../services/api';
import styles from './Home.module.css';

type Product = {
  _id: string;
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
      <h1 className={styles.title}>Копченая рыба и колбаса в Анталии</h1>
      <button
        className={styles.addressButton}
        onClick={() =>
          window.open('https://maps.app.goo.gl/Qu62UAQF6cSC1UVN8', '_blank')
        }
      >
        Посмотреть адрес
      </button>
      <div className={styles.productList}>
        {products.map((product) => (
          <ProductCard
            id={product._id}
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
