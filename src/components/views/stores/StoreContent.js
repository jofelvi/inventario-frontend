import { useEffect, useState } from 'react';
import axios from 'axios';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar';
import {  FlexR } from '@components/views/entries/styles';
import { Main, Content, BackgroundContainer, Table, Title, Subtitle, FlexC, Space } from '@components/views/products/styles';

import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import Link from 'next/link';
import AddStore from './addStore';
import {DeleteOutlined, EditOutlined, UserOutlined} from "@ant-design/icons";
import ExportCSV from "@components/ExcelExport/exportCSV.js/exportCSV.";
import {UserContainer, UserLabel} from "@components/views/materials/styles";
import {Avatar} from "antd";
import {useAuth} from "@hooks/useAuth";

const StoreContent = () => {
    const [open, setOpen] = useState(false);
    const [stores, setStores] = useState([]);
    const { alert, setAlert, toggleAlert } = useAlert();
    const [totalItems, setTotalItems] = useState(0);
    const auth = useAuth();

    const userData = {
      name: auth?.user?.name,
      email: auth?.user?.email,
      role: auth?.user?.role,
    };

    useEffect(() => {
      getStores();
    }, [alert, setAlert]);

  const headersExcel = [
    { label: "storeName", key: "storeName" },
    { label: "dateCreate", key: "dateCreate" },
  ];

    const columns = [
      {
        title: 'Nombre de la Tienda',
        dataIndex: 'storeName',
        key: 'storeName',
        render: (_,record) => <Link href={`/stores/store/${record._id}`}>
          <label>{record.storeName}</label>
        </Link>
      },
      {
        title: 'Fecha de Creación',
        dataIndex: 'dateCreate',
        key: 'dateCreate',
      },
      {
        key: 'action',
        render: (record) => (
          <Space size="middle">
            <DeleteOutlined onClick={() => handleDelete(record._id)} />
            <Link href={`/stores/store/edit/${record._id}`}>
              <EditOutlined />
            </Link>
          </Space>
        ),
      },
    ];

  const  getStores = async ()=> {
    try {
      const response = await axios.get(endPoints.store.getStores);
      const storesActives = response.data.filter((item)=> item.status === "active")
      setStores(storesActives.reverse());
      setTotalItems(storesActives.length);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
    const handleDelete =async (id) => {
      try {
        const response = await axios.patch(endPoints.store.deleteStore(id));
        setAlert({
          active: true,
          message: 'Sucursal borrada exitosamente',
          type: 'success',
          autoClose: true,
        });
      } catch (error) {
        console.log(error);
      }
    };
  console.table(stores)
    return (
      <>
        <Main>
          <Sidebar />
          <BackgroundContainer>
            <FlexC>
              <FlexR>
                <Title>Tiendas</Title>
                <UserContainer>
                  <Avatar size="small" icon={<UserOutlined />} />
                  <UserLabel>{userData.name}</UserLabel>
                </UserContainer>
              </FlexR>
              {open ? (
                <Subtitle onClick={() => setOpen(false)}>Atrás</Subtitle>
              ) : (
                <Subtitle onClick={() => setOpen(true)}>Agregar Tienda</Subtitle>
              )}
            </FlexC>
            <Content>
              <div style={{display:"flex", justifyContent: "flex-end", marginBottom: 10}}>
                <ExportCSV headers={headersExcel} data={stores} nameFile={'Tiendas '} />
              </div>
              <Alert alert={alert} handleClose={toggleAlert} />
              {open ? (
                <AddStore setOpen={setOpen} setAlert={setAlert} />
              ) : (
                <Table
                  columns={columns}
                  dataSource={stores}
                  pagination={{
                    pageSize: 6,
                    total: totalItems,
                  }}
                />
              )}
            </Content>
          </BackgroundContainer>
        </Main>
      </>
    );
  };
  
  export default StoreContent;