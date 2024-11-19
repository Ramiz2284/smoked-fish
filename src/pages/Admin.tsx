import React, { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProductStatus,
} from '../services/api';
import styles from './AdminPage.module.css';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  status: 'available' | 'inProduction';
};

export const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newProductData, setNewProductData] = useState<{
    name: string;
    price: number;
    description: string;
    image: File | null;
    status: 'available' | 'inProduction';
  }>({
    name: '',
    price: 0,
    description: '',
    image: null,
    status: 'available',
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts();
        const productsWithId = fetchedProducts.map((product: any) => ({
          id: product._id,
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
          status: product.status,
        }));
        setProducts(productsWithId);
      } catch (error) {
        setError('Ошибка при загрузке товаров');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный пароль!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleSaveProduct = async () => {
    const formData = new FormData();
    formData.append('name', newProductData.name);
    formData.append('price', newProductData.price.toString());
    formData.append('description', newProductData.description);
    if (!newProductData.image) {
      alert('Пожалуйста, загрузите изображение');
      return;
    }
    formData.append('image', newProductData.image);
    formData.append('status', newProductData.status);

    try {
      setLoading(true);
      const addedProduct: Product = await addProduct(formData);
      setProducts((prev) => [...prev, addedProduct]);
      setIsAddingProduct(false);
    } catch (error) {
      setError('Ошибка при сохранении товара');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      setError('Ошибка при удалении товара');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (
    id: string,
    currentStatus: 'available' | 'inProduction'
  ) => {
    try {
      const newStatus =
        currentStatus === 'available' ? 'inProduction' : 'available';
      const updatedProduct: Product = await updateProductStatus(id, newStatus);
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? updatedProduct : product))
      );
    } catch (error) {
      alert('Ошибка при обновлении статуса товара');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Админ-панель</h1>
        <div className={styles.authForm}>
          <input
            className={styles.authInput}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
          <button className={styles.authButton} onClick={handleLogin}>
            Войти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Админ-панель</h1>
      <button onClick={handleLogout}>Выйти</button>
      <button onClick={() => setIsAddingProduct(true)}>Добавить продукт</button>

      {error && <p className={styles.error}>{error}</p>}
      {loading && <p className={styles.loading}>Загрузка...</p>}

      {isAddingProduct && (
        <div className={styles.productForm}>
          <h2>Добавить новый продукт</h2>
          <input
            type="text"
            placeholder="Название"
            value={newProductData.name}
            onChange={(e) =>
              setNewProductData({ ...newProductData, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Цена"
            value={newProductData.price}
            onChange={(e) =>
              setNewProductData({
                ...newProductData,
                price: Number(e.target.value),
              })
            }
          />
          <textarea
            placeholder="Описание"
            value={newProductData.description}
            onChange={(e) =>
              setNewProductData({
                ...newProductData,
                description: e.target.value,
              })
            }
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewProductData({
                ...newProductData,
                image: e.target.files?.[0] || null,
              })
            }
          />
          <select
            value={newProductData.status}
            onChange={(e) =>
              setNewProductData({
                ...newProductData,
                status: e.target.value as 'available' | 'inProduction',
              })
            }
          >
            <option value="available">В наличии</option>
            <option value="inProduction">В производстве</option>
          </select>
          <button onClick={handleSaveProduct}>Сохранить</button>
          <button onClick={() => setIsAddingProduct(false)}>Отмена</button>
        </div>
      )}

      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <ProductCard
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
              status={product.status}
            />
            <button onClick={() => handleDeleteProduct(product.id)}>
              Удалить
            </button>
            <button
              className={`${styles.actionButton} ${styles.status}`}
              onClick={() => handleToggleStatus(product.id, product.status)}
            >
              {product.status === 'inProduction'
                ? 'Убрать "В процессе производства"'
                : 'Установить "В процессе производства"'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
