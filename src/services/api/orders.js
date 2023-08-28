import axios from 'axios';
import endPoints from '@services/api';

const addOrder = async (body) => {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    console.log({body});
    const response = await axios.post(endPoints.orders.addOrders, body, config);
    return response.data;
  };

  const addOrderItem = async (body) => {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(endPoints.orderItems.addOrderItems, body, config);
    return response.data;
  };
  
  const deleteOrder = async (id, body) => {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.put(endPoints.orders.deleteOrder(id), body, config);
    return response.data;
  };
  
  export { deleteOrder, addOrder, addOrderItem };