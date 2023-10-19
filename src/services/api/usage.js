import axios from 'axios';
import endPoints from '@services/api';

const addUsage = async (body) => {
  const response = await axios.post(endPoints.usage.addUsage, body);
  return response.data;
};

export { addUsage };
