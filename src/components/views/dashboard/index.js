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
  const [totalProducts, setTotalProducts] = useState()
  const [totalItemsConsumos, setTotalItemsConsumos] = useState()
  const [totalItemsTiendas, setTotalItemsTiendas] = useState()

  const userData = {
    name: auth?.user?.name,
    email: auth?.user?.email,
    role: auth?.user?.role,
  };

  useEffect(() => {
      getUsage();
      getUsersCount()
      getOrdersCount()
      getProducts()
      getUsage()
      getStores()
      getInventory()
  }, [alert]);

  const getProducts = async ()=> {
    const response = await axios.get(endPoints.products.getProducts);
    setTotalProducts(response.data.length);
  }

  const getUsage = async ()=> {
    const response = await axios.get(endPoints.usage.getUsages);
    setTotalItemsConsumos(response.data.length)
  }

  const getInventory= async ()=>  {
    const response = await axios.get(endPoints.inventory.getALlInventories());
    setTotalItems(response.data.length);
  }
  const getStores = async ()=> {
    const response = await axios.get(endPoints.store.getStores);
    const storesActives = response.data.filter((item)=> item.status === "active")
    setTotalItemsTiendas(storesActives.length);
  }
  const getUsersCount = async () => {
    const response = await axios.get(endPoints.users.getUsers);
    setUsersCount(response?.data?.total || 0)
  }

  const getOrdersCount = async () => {
    const response = await axios.get(endPoints.orders.getOrders);
    setOrderCount(response?.data?.length || 0)
  }

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
            <label>Cantidad en Materiales</label>
              <div className="stats">
                <div className="stat">
                  <div className="stat-title">Total Materiales </div>
                  <div className="stat-value">{totalItems || 0}</div>
                  <div className="stat-desc"></div>
                </div>
              </div>
            </SmallCard>
            <SmallCard>
              <label>Cantidad Productos</label>
              <div className="stats">
                <div className="stat">
                  <div className="stat-title">Total de Productos</div>
                  <div className="stat-value">{totalProducts|| 0}</div>
                  <div className="stat-desc"></div>
                </div>
              </div>
            </SmallCard>
            <SmallCard>
              <label>Cantidad Consumos</label>
              <div className="stats">
                <div className="stat">
                  <div className="stat-title">Total de Consumos</div>
                  <div className="stat-value">{totalItemsConsumos || 0}</div>
                  <div className="stat-desc"></div>
                </div>
              </div>
            </SmallCard>
            <SmallCard>
              <label>Cantidad Tiendas</label>
              <div className="stats">
                <div className="stat">
                  <div className="stat-title">Total de Tiendas</div>
                  <div className="stat-value">{totalItemsTiendas || 0}</div>
                  <div className="stat-desc"></div>
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
