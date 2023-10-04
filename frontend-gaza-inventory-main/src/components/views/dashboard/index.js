import React, { useEffect, useState } from 'react';
import Sidebar from '@components/sidebar/Sidebar';
import { Main, Content, BackgroundContainer, WelcomeTitle, FlexC, Title, CardsContainer, SmallCard } from '@components/views/dashboard/styles';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/router';
import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';

const DashboardContent = () => {

  const auth = useAuth();

  const userData = {
    name: auth?.user?.name,
    email: auth?.user?.email,
    role: auth?.user?.role,
  };

  return (
    <Main>
      <Sidebar />
      <BackgroundContainer>
      <FlexC>
      <Title>Dashboard</Title>
      </FlexC>
        <Content>
          <WelcomeTitle>Bienvenido, {userData.name}!</WelcomeTitle>
          <CardsContainer>
      <SmallCard>uno</SmallCard>
      <SmallCard>uno</SmallCard>
      <SmallCard>uno</SmallCard>
      <SmallCard>uno</SmallCard>
      </CardsContainer>
        </Content>
      </BackgroundContainer>
    </Main>
  );
};

export default DashboardContent;
