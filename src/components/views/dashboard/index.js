import React, { useEffect, useState } from 'react';
import Sidebar from '@components/sidebar/Sidebar';
import { Main, Content, BackgroundContainer, WelcomeTitle, FlexC, Title, CardsContainer, SmallCard, ListContainer, List, ActivityContainer } from '@components/views/dashboard/styles';
import { useAuth } from '@hooks/useAuth';
import DynamicTable from '../../../components/ListDashboard/DynamicTable'
import DynamicTableXl from '@components/ListDashboard/DynamicTableXl';
import axios from "axios";
import endPoints from "@services/api";
import useAlert from "@hooks/useAlert";
import {ChartVerticalUsers} from "@components/chartVerticalUsers";

const DashboardContent = () => {
  const auth = useAuth();
  const { alert, setAlert, toggleAlert } = useAlert();
  const [inventaryArray, setInventaryArray] = useState([])
  const [totalItems, setTotalItems] = useState()
  const [totalOutInventory, setTotalOutInventory] = useState()
  const [totalInInventory, setTotalInInventory] = useState()
  const [usersCount, setUsersCount] = useState()
  const [orderCount, setOrderCount] = useState()

  const userData = {
    name: auth?.user?.name,
    email: auth?.user?.email,
    role: auth?.user?.role,
  };

  useEffect(() => {
      getUsage();
      getUsersCount()
      getOrdersCount()
  }, [alert]);

  const getUsage = async () => {
    const response = await axios.get(endPoints.inventory.getALlInventories());
    const inventories = response.data;

    const { in: inCount, out: outCount } = inventories.reduce(
      (counts, item) => {
        if (item.transactionProducts.length > 0) {
          if (item.transactionProducts[0].typeTransaction === 'out') {
            counts.out++;
          } else if (item.transactionProducts[0].typeTransaction === 'in') {
            counts.in++;
          }
        }
        return counts;
      },
      { in: 0, out: 0 }
    );
    setTotalItems(inventories.length);
    setTotalOutInventory(outCount);
    setTotalInInventory(inCount);
    setInventaryArray(inventories.filter((item) => item.transactionProducts.length > 0));
  }

  const getUsersCount = async () => {
    const response = await axios.get(endPoints.users.getUsers);
    setUsersCount(response?.data?.total || 0)
  }

  const getOrdersCount = async () => {
    const response = await axios.get(endPoints.orders.getOrders);
    setOrderCount(response?.data?.length || 0)
  }

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

  const labels = ['Octubre', 'Noviembre', 'Diciembre'];

  const dataChartBar = {
    labels,
    datasets: [
      {
        label: 'Usuarios activos',
        data: [usersCount]
      },
    ],
  };
  const dataChartBarOrder = {
    labels,
    datasets: [
      {
        label: 'Ordenes Procesadas',
        data: [orderCount]
      },
    ],
  };


  return (
    <Main>
      <Sidebar />
      <BackgroundContainer>
        <Content>
          <h2>Bienvenido, {userData.name}!</h2>
          <CardsContainer>
            <SmallCard>
            <label>Cantidad en stock</label>
              <div className="stats">
                <div className="stat">
                  <div className="stat-title">Total General </div>
                  <div className="stat-value">{totalItems || 0}</div>
                  <div className="stat-desc">100% del ultimo mes</div>
                </div>
              </div>
            </SmallCard>
            <SmallCard>
              <label>Cantidad Salidas</label>
              <div className="stats">
                <div className="stat">
                  <div className="stat-title">Total </div>
                  <div className="stat-value">{totalOutInventory|| 0}</div>
                  <div className="stat-desc">100% del ultimo mes</div>
                </div>
              </div>
            </SmallCard>
            <SmallCard>
              <label>Cantidad Entradas</label>
              <div className="stats">
                <div className="stat">
                  <div className="stat-title">Total </div>
                  <div className="stat-value">{totalInInventory || 0}</div>
                  <div className="stat-desc">100% del ultimo mes</div>
                </div>
              </div>
            </SmallCard>
          </CardsContainer>
          <ListContainer>
            <List>{usersCount && <ChartVerticalUsers data={dataChartBar} title="Top Users" />}</List>
            <List>{orderCount && <ChartVerticalUsers data={dataChartBarOrder} title="Top Users" />}</List>
          </ListContainer>
{/*
          <ActivityContainer><DynamicTableXl headers={headers} data={data} /> </ActivityContainer>
*/}
        </Content>
      </BackgroundContainer>
    </Main>
  );
};


export default DashboardContent;
