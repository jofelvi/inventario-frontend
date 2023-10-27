import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar'
import { Main, Content, BackgroundContainer, Title, Subtitle, FlexC} from '@components/views/products/styles';
import {Aling} from "./edit/styles";
import AddMaterial from "@components/views/materials/addMaterial";


const MaterialDetail = () => {

  const router = useRouter();
  const [material, setMaterial] = useState({});

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getMaterial() {
      const response = await axios.get(endPoints.material.getMaterial(id));
      setMaterial(response.data);
    }
    getMaterial();
  }, [router?.isReady]);

  return (
    <Main>
      <Sidebar />
      <BackgroundContainer>
        <FlexC>
          <Title>Detalle Material</Title>
          <Link href={'/products/materials'}>
            <Subtitle>Atras</Subtitle>
          </Link>
        </FlexC>
        <Aling>
          <Content>
            <AddMaterial isReadOnly={true} material={material}/>
          </Content>
        </Aling>
      </BackgroundContainer>
    </Main>
  );
};

export default MaterialDetail;