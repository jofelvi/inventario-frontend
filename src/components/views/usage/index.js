import { useEffect, useState } from 'react';
import axios from 'axios';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar';
import { Main, Content, BackgroundContainer, Title, Subtitle, FlexC } from '@components/views/entries/styles';
import AddUsage from '@components/views/usage/addUsage/index';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import {Collapse, Table} from "antd";
const { Panel } = Collapse;
const UsageContent = () => {
  const [open, setOpen] = useState(false);
  const { alert, setAlert, toggleAlert } = useAlert();
  const [inventaryArray, setInventaryArray] = useState()
  const [totalItems, setTotalItems] = useState()

  useEffect(() => {
    async function getUsage() {
      const response = await axios.get(endPoints.inventory.getALlInventories());
      setTotalItems(response.data.length)
      const inventoryByStore= response.data.filter((item)=> {
        if ( item.transactionProducts.length > 0 ) {
         return  item.transactionProducts[0].typeTransaction === 'out'
        }
      })
      console.log(JSON.stringify(inventoryByStore))
      setInventaryArray(inventoryByStore)
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
      dataIndex: 'updateAt',
      key: 'updateAt',
      render: (updateAt) => <span>{new Date(updateAt).toLocaleDateString()}</span>,
    },
    {
      title: 'Usuario',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: 'Producto',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantityTotal',
      key: 'quantityTotal',
    },
    {
      title: 'Sucursal',
      dataIndex: 'storeName',
      key: 'storeName',
    },
    {
      title: 'Transacciones',
      key: 'transactionProducts',
      render: (record) => (
        <Collapse>
          {record.transactionProducts.map((transaction, index) => (
            <Panel header={`Transacción ${index + 1}`} key={`transaction-${index}`}>
              <p>Tipo de Transacción: {transaction.typeTransaction}</p>
              <p>Cantidad de Transacción: {transaction.quantityTransaction}</p>
            </Panel>
          ))}
        </Collapse>
      ),
    },
  ];

  return (
    <>
      <Main>
        <Sidebar />
        <BackgroundContainer>
          <FlexC>
            <Title>Consumo de Productos</Title>
            {open ? <Subtitle onClick={() => setOpen(false)}>Atras</Subtitle> : <Subtitle onClick={() => setOpen(true)}>Añadir Consumo</Subtitle>}
          </FlexC>
          <Content>
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
