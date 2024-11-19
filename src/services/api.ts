export const addProduct = async (formData: FormData) => {
  try {
    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Ошибка при добавлении товара');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/products');
    if (!response.ok) {
      throw new Error('Ошибка при получении товаров');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Ошибка при удалении товара');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const API_URL = 'http://localhost:5000/api/products';

export const updateProductStatus = async (
  id: string,
  status: 'available' | 'inProduction'
) => {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('Ошибка при обновлении статуса');
  }

  return await response.json();
};
