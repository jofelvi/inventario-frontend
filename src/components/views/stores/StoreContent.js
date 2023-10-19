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
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const StoreContent = () => {
    const [open, setOpen] = useState(false);
    const [stores, setStores] = useState([]);
    const { alert, setAlert, toggleAlert } = useAlert();
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
      getStores();
    }, [alert, setAlert]);

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
              </FlexR>
              {open ? (
                <Subtitle onClick={() => setOpen(false)}>Atrás</Subtitle>
              ) : (
                <Subtitle onClick={() => setOpen(true)}>Agregar Tienda</Subtitle>
              )}
            </FlexC>
            <Content>
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