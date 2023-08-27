import axios from 'axios';
import endPoints from '@services/api';

const addJuncalInventory = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.juncalInventory.addJuncalInventory, body, config);
  return response.data;
};

const addMainInventory = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.mainInventory.addMainInventory, body, config);
  return response.data;
};

const addMirandaInventory = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.mirandaInventory.addMirandaInventory, body, config);
  return response.data;
};

const updateMainInventory = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.put(endPoints.mainInventory.updateMainInventory(id), body, config);
  return response.data;
};

const updateMirandaInventory = async (id, body) => {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.put(endPoints.mirandaInventory.updateMirandaInventory(id), body, config);
    return response.data;
  };

  const updateJuncalInventory = async (id, body) => {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.put(endPoints.juncalInventory.updateJuncalInventory(id), body, config);
    return response.data;
  };

export {
  updateMainInventory,
  updateJuncalInventory,
  updateMirandaInventory,
  addJuncalInventory,
  addMainInventory,
  addMirandaInventory
};