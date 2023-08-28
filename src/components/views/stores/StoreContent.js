import { useEffect, useState } from 'react';
import axios from 'axios';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar';
import { Main, Content, BackgroundContainer,  FlexR,UserContainer,Table, Title, Subtitle, FlexC, Space } from '@components/views/entries/styles';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import Link from 'next/link';
import AddStore from './addStore';

const StoreContent = () => {
    const [open, setOpen] = useState(false);
    const [stores, setStores] = useState([]);
    const { alert, setAlert, toggleAlert } = useAlert();
    const [totalItems, setTotalItems] = useState(0);
  
    const columns = [
      {
        title: 'Nombre de la Tienda',
        dataIndex: 'storeName',
        key: 'storeName',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Fecha de Creación',
        dataIndex: 'dateCreate',
        key: 'dateCreate',
      },
      {
        title: 'Estado',
        dataIndex: 'status',
        key: 'status',
      },
      {
        key: 'action',
        render: (record) => (
          <Space size="middle">
            <Link href={`/stores/edit/${record._id}`}>Editar</Link>
            <a onClick={() => handleDelete(record._id)}>Eliminar</a>
          </Space>
        ),
      },
    ];
  
    useEffect(() => {
      async function getStores() {
        try {
          const response = await axios.get(endPoints.store.getStores);
          setStores(response.data);
          setTotalItems(response.data.length);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      getStores();
    }, [alert]);
  
    const handleDelete = (id) => {
      console.log(id);
      
    };
  
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
                <AddStore setOpen={setOpen} setAlertProps={setAlert} />
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