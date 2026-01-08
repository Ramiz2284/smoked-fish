import React from 'react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { DEFAULT_PRODUCTS } from '../data/products';
import styles from './Home.module.css';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Копченая рыба и колбаса в Анталии</h1>
      <h2 className={styles.subtitle}>
        Свежая рыба без химии — каждую неделю домашнее копчение. Глубокая
        заморозка перед копчением до -40°C для вашей безопасности.
      </h2>
      <button
        className={styles.addressButton}
        onClick={() =>
          window.open('https://maps.app.goo.gl/Qu62UAQF6cSC1UVN8', '_blank')
        }
      >
        Посмотреть адрес
      </button>
      <div className={styles.productList}>
        {DEFAULT_PRODUCTS.map((product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            images={product.images}
            status={product.status}
          />
        ))}
      </div>
    </div>
  );
};
