import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AddProduct from '@components/views/products/addProduct/index';
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
  const [product, setProduct] = useState({});

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getProduct() {
      const response = await axios.get(endPoints.products.getProduct(id));
      setProduct(response.data);
    }
    getProduct();
  }, [router?.isReady]);

  return (
    <Main>
    <Sidebar />
    <BackgroundContainer>
    <FlexC>
      <Title>Editar Producto</Title> 
      <Link href={'/products'}>
        <Subtitle>Atras</Subtitle>
      </Link> 
    </FlexC>
    <Aling>
      <Content>

        <AddProduct product={product}/>
      </Content>
    </Aling>
    </BackgroundContainer>
  </Main>
  );
};

export default Edit;