import React, { useState } from 'react';
import stub from '../../../img/stub.jpeg';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  status: 'available' | 'inProduction';
};

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  description,
  image,
  status,
}) => {
  const [imageSrc, setImageSrc] = useState(image); // Состояние для источника изображения

  // URL заглушки
  const placeholderImage = stub;

  // Генерация ссылки на WhatsApp для заказа
  const handleWhatsAppOrderLink = () => {
    const phoneNumber = '905444558407'; // Номер телефона
    const message = `Здравствуйте! Я хочу заказать "${name}" за ${price} ₺.`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  // Генерация ссылки на WhatsApp для запроса фото
  const handleWhatsAppPhotoRequestLink = () => {
    const phoneNumber = '905444558407'; // Номер телефона
    const message = `Здравствуйте! Не могли бы вы отправить фото последней партии "${name}"?`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className={styles.card}>
      <img
        src={imageSrc}
        alt={name}
        className={styles.image}
        onError={() => setImageSrc(placeholderImage)} // Подменяем изображение на заглушку при ошибке загрузки
      />
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}>{price} ₺</p>
      <div className={styles.btnWrap}>
        {status === 'inProduction' && (
          <span className={styles.badge}>В процессе производства</span>
        )}
        <a
          href={handleWhatsAppOrderLink()}
          className={styles.orderButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          Заказать
        </a>
        <a
          href={handleWhatsAppPhotoRequestLink()}
          className={`${styles.orderButton} ${styles.photoRequestButton}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Запросить фото последнего копчения
        </a>
      </div>
    </div>
  );
};
