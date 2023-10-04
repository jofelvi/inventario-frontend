import axios from 'axios';
import endPoints from '@services/api';

const addUsage = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.usage.addUsage, body, config);
  return response.data;
};

export { addUsage };
