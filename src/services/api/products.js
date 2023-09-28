import axios from 'axios';
import endPoints from '@services/api';

const config = {
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json',
  },
};
const addProduct = async (body) => {
  const response = await axios.post(endPoints.products.addProducts, body, config);
  return response.data;
};

const deleteProduct = async (id) => {
	const response = await axios.delete(endPoints.products.deleteProduct(id));
	return response.data;
}

const updateProduct = async (id, body) => {
  const response = await axios.put(endPoints.products.updateProduct(id), body, config);
  return response.data;
};

const updateInventoryByProductId = async (id, body) => {
  const response = await axios.put(endPoints.products.updateProductForInventary(id), body, config);
  return response.data;
};

export { addProduct, deleteProduct, updateProduct, updateInventoryByProductId };