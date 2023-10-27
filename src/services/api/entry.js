import axios from 'axios';
import endPoints from '@services/api';

const addEntry = async (data) => {
  const response = await axios.post(endPoints.inventory.transferMaterials, data);
  return response.data;
};

const updateEntry = async (id, body) => {
  const response = await axios.put(endPoints.entries.updateEntrie(id), body);
  return response.data;
};

export { updateEntry, addEntry };