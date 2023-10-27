import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar';
import { Main, Content, BackgroundContainer, Table, Title, Subtitle, FlexC, Space } from '@components/views/products/styles';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import AddOrder from '@components/views/orders/addOrder/index';
import ExportCSV from "@components/ExcelExport/exportCSV.js/exportCSV.";
import {useAuth} from "@hooks/useAuth";
import {FlexR, UserContainer, UserLabel} from "@components/views/materials/styles";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";

const OrdersContent = () => {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const { alert, setAlert, toggleAlert } = useAlert();
  const [totalItems, setTotalItems] = useState(0);
  const auth = useAuth();

  const userData = {
    name: auth?.user?.name,
    email: auth?.user?.email,
    role: auth?.user?.role,
  };

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (createAt) => <span>{createAt.substring(0, 10)}</span>,
    },
    {
      title: 'Factura',
      dataIndex: 'bill',
      key: 'bill',
      render: (text, record) => (
        <Link href={`/orders/order/${record._id}`}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Proveedor',
      dataIndex: 'providerName',
      key: 'providerName',
    },
    {
      title: 'Precio Total',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (total_price) => <span>${total_price}</span>,
    },
    {
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Link href={`/orders/order/edit/${record._id}`}>
            Añadir items
          </Link>
        </Space>
      ),
    },
  ];
  const headersExcel = [
    { label: "createAt", key: "createAt" },
    { label: "bill", key: "bill" },
    { label: "providerName", key: "providerName" },
    { label: "total_price", key: "total_price" },
  ];

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(endPoints.orders.getOrders);
      setOrders(response.data.reverse());
      setTotalItems(response.data.length);
    }
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, [alert]);


  return (
    <>
      <Main>
        <Sidebar />
        <BackgroundContainer>
          <FlexC>
            <FlexR>
              <Title>Ordenes de Compra</Title>
              <UserContainer>
                <Avatar size="small" icon={<UserOutlined />} />
                <UserLabel>{userData.name}</UserLabel>
              </UserContainer>
            </FlexR>
            {open ? <Subtitle onClick={() => setOpen(false)}>Atras</Subtitle> : <Subtitle onClick={() => setOpen(true)}>Añadir Orden</Subtitle>}
          </FlexC>
          <Content>
            <div style={{display:"flex", justifyContent: "flex-end", marginBottom: 10}}>
              {orders && <ExportCSV headers={headersExcel} data={orders} nameFile={'Ordenes '} />}
            </div>
            <Alert alert={alert} handleClose={toggleAlert} />
            {open ? <AddOrder setOpen={setOpen} setAlert={setAlert} /> 
            :
            <Table
              columns={columns}
              dataSource={orders}
              pagination={{
              pageSize: 6,
              total: totalItems,
            }}
            />}
          </Content>
        </BackgroundContainer>
      </Main>
    </>
  );
};

export default OrdersContent;
