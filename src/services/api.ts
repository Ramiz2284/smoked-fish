const API_URL = 'https://smokedfish.marketlistem.site/api/products';

// Добавить продукт
export const addProduct = async (formData: FormData): Promise<Product> => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Ошибка при добавлении товара');
    }

    return await response.json(); // Возвращаем продукт
  } catch (error) {
    console.error('Ошибка в addProduct:', error);
    throw error;
  }
};

// Получить список товаров
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}`);

    if (!response.ok) {
      throw new Error('Ошибка при получении товаров');
    }

    return await response.json(); // Возвращаем список продуктов
  } catch (error) {
    console.error('Ошибка в fetchProducts:', error);
    throw error;
  }
};

// Удалить продукт
export const deleteProduct = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Ошибка при удалении товара');
    }

    return await response.json(); // Возвращаем результат удаления
  } catch (error) {
    console.error('Ошибка в deleteProduct:', error);
    throw error;
  }
};

// Обновить статус товара
export const updateProductStatus = async (
  id: string,
  status: 'available' | 'inProduction'
): Promise<Product> => {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('Ошибка при обновлении статуса');
  }

  return await response.json(); // Возвращаем обновленный продукт
};

// Обновить продукт
export const updateProduct = async (
  id: string,
  formData: FormData
): Promise<Product> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Ошибка при обновлении товара');
    }

    return await response.json(); // Возвращаем обновленный продукт
  } catch (error) {
    console.error('Ошибка в updateProduct:', error);
    throw error;
  }
};
