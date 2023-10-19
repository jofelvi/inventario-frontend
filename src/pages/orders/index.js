import React, {useEffect} from 'react';
import OrdersContent from '@components/views/orders/index';
import {useIsAuthenticate} from "@components/hooks/UseIsAuthenticate";

const Orders = () => {
  return (
    <OrdersContent />
  )
}

export default Orders;