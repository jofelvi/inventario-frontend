import axios from 'axios';
import endPoints from '@services/api';

const addEntry = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.entries.addEntries, body, config);
  return response.data;
};

const updateEntry = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.put(endPoints.entries.updateEntrie(id), body, config);
  return response.data;
};

export { updateEntry, addEntry };