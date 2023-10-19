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
import useAlert from "@hooks/useAlert";
import AddItemToProduct from "@components/views/orders/addOrderItem/index";

const Add = () => {
  const router = useRouter();
  const [order, setOrder] = useState({});
  const { id } = router.query;

  const [product, setProduct] = useState({});

  useEffect(() => {
    if (!router.isReady) return;
    async function getProduct() {
      const response = await axios.get(endPoints.products.getProduct(id));
      setProduct(response.data);
    }
    getProduct();
  }, [id]);

  return (
    <Main>
    <Sidebar />
    <BackgroundContainer>
    <FlexC>
      <Title>Añadir items a un producto</Title>
      <Link href={'/products'}>
        <Subtitle>Atras</Subtitle>
      </Link> 
    </FlexC>
    <Aling>
      <Content>
        <span> <b>{order.bill}</b></span>
        <AddItemToProduct order={order} id={id}/>
      </Content>
    </Aling>
    </BackgroundContainer>
  </Main>
  );
};

export default Add;