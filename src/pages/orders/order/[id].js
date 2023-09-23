import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar'
import { Main, Content, BackgroundContainer, Table, Title, Subtitle, FlexC, Space } from '@components/views/products/styles';


const OrderDetail = () => {

  const router = useRouter();
  const [order, setOrder] = useState({});

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getOrder() {
      const response = await axios.get(endPoints.orders.getOrder(id));
      setOrder(response.data);
      console.log(response.data)
    }
    getOrder();
  }, [router?.isReady]);


  return (
      <Main>
        <Sidebar />
        <BackgroundContainer>
          <FlexC>
            <Title>Orden Factura {order.bill}</Title>
            <Link href={'/orders'}>
              <Subtitle>Atras</Subtitle>
            </Link>
          </FlexC>
          <Content>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Material
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {order?.materials?.map((item) => (
                  <tr key={`Inventory-item-${item.id}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.materialName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.quantity} {item.unit}</div>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </Content>
        </BackgroundContainer>
      </Main>
  );
};

export default OrderDetail;