import { useEffect, useState } from 'react';
import axios from 'axios';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar';
import { Main, Content, BackgroundContainer, Title, Subtitle, FlexC } from '@components/views/entries/styles';
import AddUsage from '@components/views/usage/addUsage/index';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import {Avatar, Collapse, Table} from "antd";
import ExportCSV from "@components/ExcelExport/exportCSV.js/exportCSV.";
import {FlexR, UserContainer, UserLabel} from "@components/views/materials/styles";
import {UserOutlined} from "@ant-design/icons";
import {useAuth} from "@hooks/useAuth";
const { Panel } = Collapse;
const UsageContent = () => {
  const [open, setOpen] = useState(false);
  const { alert, setAlert, toggleAlert } = useAlert();
  const [inventaryArray, setInventaryArray] = useState()
  const [totalItems, setTotalItems] = useState()

  const auth = useAuth();

  const userData = {
    name: auth?.user?.name,
    email: auth?.user?.email,
    role: auth?.user?.role,
  };

  useEffect(() => {
    async function getUsage() {
      const response = await axios.get(endPoints.usage.getUsages);
      setTotalItems(response.data.length)
      console.log(response.data)
      setInventaryArray(response.data.reverse())
    }
    try {
      getUsage();
    } catch (error) {
      console.log(error);
    }
  }, [alert]);

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
    },
    {
      title: 'Producto',
      dataIndex: 'productName',
      key: 'productName'
    },
    {
      title: 'Sucursal',
      dataIndex: 'storeName',
      key: 'storeName',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
    },
     {
      title: 'Usuario',
      dataIndex: 'userId',
      key: 'userId',
    },

  ];
  const headersExcel = [
    { label: "date", key: "date" },
    { label: "productName", key: "productName" },
    { label: "quantity", key: "quantity" },
    { label: "storeName", key: "storeName" },
  ];
  return (
    <>
      <Main>
        <Sidebar />
        <BackgroundContainer>
          <FlexC>
            <FlexR>
              <Title>Consumo de Productos</Title>
              <UserContainer>
                <Avatar size="small" icon={<UserOutlined />} />
                <UserLabel>{userData.name}</UserLabel>
              </UserContainer>
            </FlexR>
            {open ? <Subtitle onClick={() => setOpen(false)}>Atras</Subtitle> : <Subtitle onClick={() => setOpen(true)}>Añadir Consumo</Subtitle>}
          </FlexC>
          <Content>
            <div style={{display:"flex", justifyContent: "flex-end", marginBottom: 10}}>
              {inventaryArray && <ExportCSV headers={headersExcel} data={inventaryArray} nameFile={'Consumos '} />}
            </div>
            <Alert alert={alert} handleClose={toggleAlert} />
            {open ? (
              <AddUsage setOpen={setOpen} setAlert={setAlert} />
            ) : (
              <Table
                columns={columns}
                dataSource={inventaryArray}
              /*  expandable={{
                  expandedRowRender: (record) => record.transactionProducts.length > 0,
                  rowExpandable: (record) => record.transactionProducts.length > 0,
                }}*/
                pagination={{
                  pageSize: 6,
                  total: totalItems,
                }}/>
            )}
          </Content>
        </BackgroundContainer>
      </Main>
    </>
  );
};

export default UsageContent;
