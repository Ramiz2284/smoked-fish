import React, { useState } from 'react';
import stub from '../../../img/stub.jpeg';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: (string | File)[]; // Массив фото (строки или File объекты)
  status: 'available' | 'inProduction';
};

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  description,
  images,
  status,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageSrc, setImageSrc] = useState<string>(
    typeof images[0] === 'string' ? images[0] : ''
  );
  const placeholderImage = stub;

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
    const img = images[nextIndex];
    if (typeof img === 'string') {
      setImageSrc(img);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex =
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    const img = images[prevIndex];
    if (typeof img === 'string') {
      setImageSrc(img);
    }
  };

  const handleWhatsAppOrderLink = () => {
    const phoneNumber = '905444558407';
    const message = `Здравствуйте! Я хочу заказать "${name}" за ${price} ₺.`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div
      className={`${styles.cardWrapper} ${isFlipped ? styles.flippedWrapper : ''}`}
    >
      {/* Стрелки перелистывания вне карточки */}
      {images.length > 1 && (
        <>
          <button
            className={styles.prevBtn}
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage(e);
            }}
            title="Предыдущее фото"
          >
            ❮
          </button>
          <button
            className={styles.nextBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage(e);
            }}
            title="Следующее фото"
          >
            ❯
          </button>
        </>
      )}
      <div
        className={styles.cardContainer}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
          {/* Сторона 1: Фото, название, цена */}
          <div className={styles.cardFront}>
            <div className={styles.imageContainer}>
              <img
                src={imageSrc}
                alt={name}
                className={styles.image}
                onError={() => setImageSrc(placeholderImage)}
              />
              {images.length > 1 && (
                <div className={styles.imageCounter}>
                  {currentImageIndex + 1}/{images.length}
                </div>
              )}
            </div>
            <div className={styles.cardFrontContent}>
              <h2 className={styles.name}>{name}</h2>
              <p className={styles.price}>{price} ₺</p>
              {status === 'inProduction' && (
                <span className={styles.badge}>В процессе производства</span>
              )}
              <p className={styles.clickHint}>Нажмите для описания →</p>
            </div>
          </div>

          {/* Сторона 2: Описание */}
          <div className={styles.cardBack}>
            <div className={styles.backContent}>
              <p className={styles.description}>{description}</p>
              <p className={styles.clickHint}>← Назад к фото</p>
            </div>
          </div>
        </div>
      </div>

      {/* Кнопка заказать снизу (не переворачивается) */}
      <a
        href={handleWhatsAppOrderLink()}
        className={styles.orderButton}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        Заказать в WhatsApp
      </a>
    </div>
  );
};
