import React, { useEffect, useState } from 'react';
import Sidebar from '@components/sidebar/Sidebar';
import { Main, Content, BackgroundContainer, WelcomeTitle, FlexC, Title, CardsContainer, SmallCard, ListContainer, List, ActivityContainer } from '@components/views/dashboard/styles';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/router';
import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import DynamicTable from '../../../components/ListDashboard/DynamicTable'
import DynamicTableXl from '@components/ListDashboard/DynamicTableXl';

const DashboardContent = () => {
  const auth = useAuth();

  const userData = {
    name: auth?.user?.name,
    email: auth?.user?.email,
    role: auth?.user?.role,
  };

  const headers = ['ID', 'Name', 'Job', 'Favorite Color'];

  const data = [
    { id: '1', name: 'Cy Ganderton', job: 'Quality Control Specialist', favoriteColor: 'Blue' },
    { id: '2', name: 'Hart Hagerty', job: 'Desktop Support Technician', favoriteColor: 'Purple' },
    { id: '3', name: 'Brice Swyre', job: 'Tax Accountant', favoriteColor: 'Red' },
    { id: '4', name: 'Brice Swyre', job: 'Tax Accountant', favoriteColor: 'Red' },
    { id: '5', name: 'Brice Swyre', job: 'Tax Accountant', favoriteColor: 'Red' },
    { id: '4', name: 'Brice Swyre', job: 'Tax Accountant', favoriteColor: 'Red' },
    { id: '5', name: 'Brice Swyre', job: 'Tax Accountant', favoriteColor: 'Red' },
    { id: '3', name: 'Brice Swyre', job: 'Tax Accountant', favoriteColor: 'Red' },
    { id: '4', name: 'Brice Swyre', job: 'Tax Accountant', favoriteColor: 'Red' },
    { id: '5', name: 'Brice Swyre', job: 'Tax Accountant', favoriteColor: 'Red' },
    { id: '4', name: 'Brice Swyre', job: 'Tax Accountant', favoriteColor: 'Red' },
    { id: '5', name: 'Brice Swyre', job: 'Tax Accountant', favoriteColor: 'Red' },
  ];

  return (
    <Main>
      <Sidebar />
      <BackgroundContainer>
        <Content>
          <h2>Bienvenido, {userData.name}!</h2>
          <CardsContainer>
            
            <SmallCard>
              <label>Capacidad de Produccion</label>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Total Page Views</div>
                  <div className="stat-value">89,400</div>
                  <div className="stat-desc">21% more than last month</div>
                </div>
              </div>
            </SmallCard>
            <SmallCard>
            <label>Cantidad en stock</label>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Total Page Views</div>
                  <div className="stat-value">89,400</div>
                  <div className="stat-desc">21% more than last month</div>
                </div>
              </div>
            </SmallCard>
            <SmallCard>
            <label>Inversion Actual</label>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Total Page Views</div>
                  <div className="stat-value">89,400</div>
                  <div className="stat-desc">21% more than last month</div>
                </div>
              </div>
            </SmallCard>
            <SmallCard>
            <label>Usuarios Registrados</label>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Total Page Views</div>
                  <div className="stat-value">89,400</div>
                  <div className="stat-desc">21% more than last month</div>
                </div>
              </div>
            </SmallCard>
          </CardsContainer>
          <ListContainer>
            <List><DynamicTable headers={headers} data={data} /></List>
            <List><DynamicTable headers={headers} data={data} /></List>
            <List><DynamicTable headers={headers} data={data} /></List>
          </ListContainer>
          <ActivityContainer><DynamicTableXl headers={headers} data={data} /> </ActivityContainer>
        </Content>
      </BackgroundContainer>
    </Main>
  );
};


export default DashboardContent;
