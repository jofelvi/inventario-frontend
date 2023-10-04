import axios from 'axios';
import endPoints from '@services/api';

const addMaterial = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.material.addMaterial, body, config);
  return response.data;
};

const deleteMaterial = async (id) => {
	const response = await axios.delete(endPoints.material.deleteMaterial(id));
	return response.data;
}

const updateMaterial = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.put(endPoints.material.updateMaterial(id), body, config);
  return response.data;
};

export { addMaterial, deleteMaterial, updateMaterial };