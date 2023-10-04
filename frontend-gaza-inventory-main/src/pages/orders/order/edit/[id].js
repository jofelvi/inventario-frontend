import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AddOrderItem from '@components/views/orders/addOrderItem/index';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar'
import { 
  Main,
  Content,
  BackgroundContainer, 
  Title,
  Subtitle,
  FlexC,
  Aling
 } from './styles';

const Edit = () => {

  const router = useRouter();
  const [order, setOrder] = useState({});

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getOrder() {
      const response = await axios.get(endPoints.orders.getOrder(id));
      setOrder(response.data);
    }
    getOrder();
  }, [router?.isReady]);

  return (
    <Main>
    <Sidebar />
    <BackgroundContainer>
    <FlexC>
      <Title>Añadir items</Title> 
      <Link href={'/orders'}>
        <Subtitle>Atras</Subtitle>
      </Link> 
    </FlexC>
    <Aling>
      <Content>
        <span>Factura <b>{order.bill}</b></span>
        <AddOrderItem order={order}/>
      </Content>
    </Aling>
    </BackgroundContainer>
  </Main>
  );
};

export default Edit;