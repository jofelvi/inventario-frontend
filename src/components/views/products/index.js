import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar';
import { Main, Content, BackgroundContainer, Table, Title, Subtitle, FlexC, Space } from '@components/views/products/styles';
import AddProduct from '@components/views/products/addProduct/index';
import { deleteProduct } from '@services/api/products';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import {EditOutlined, DeleteOutlined, UserOutlined} from '@ant-design/icons';
import ExportCSV from "@components/ExcelExport/exportCSV.js/exportCSV.";
import {FlexR, UserContainer, UserLabel} from "@components/views/materials/styles";
import {Avatar} from "antd";
import {useAuth} from "@hooks/useAuth";

const ProductsContent = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
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
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link href={`/products/product/${record._id}`}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <a>${price}</a>,
    },
    {
      title: 'Unidad',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <DeleteOutlined onClick={() => handleDelete(record._id)} />
          <Link href={`/products/product/edit/${record._id}`}>
            <EditOutlined />
          </Link>
        </Space>
      ),
    },
    {
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Link href={`/products/product/add/${record._id}`}>
            Añadir Materiales
          </Link>
        </Space>
      ),
    },
  ];

  const headersExcel = [
    { label: "name", key: "name" },
    { label: "price", key: "price" },
    { label: "unit", key: "unit" },
  ];

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(endPoints.products.getProducts);
      console.log(response.data);
      setProducts(response.data.reverse());
      setTotalItems(response.data.length);
    }
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, [alert]);

  const handleDelete = (id) => {
    console.log(id);
    deleteProduct(id)
      .then(() => {
        setAlert({
          active: true,
          message: 'Producto Eliminado Exitosamente',
          type: 'success',
          autoClose: false,
        });
      })
      .catch((error) => {
        setAlert({
          active: true,
          message: error.message,
          type: 'error',
          autoClose: false,
        });
      });
  };

  return (
    <>
      <Main>
        <Sidebar />
        <BackgroundContainer>
          <FlexC>
            <FlexR>
              <Title>Productos</Title>
              <UserContainer>
                <Avatar size="small" icon={<UserOutlined />} />
                <UserLabel>{userData.name}</UserLabel>
              </UserContainer>
            </FlexR>
            {open ? <Subtitle onClick={() => setOpen(false)}>Atras</Subtitle> : <Subtitle onClick={() => setOpen(true)}>Añadir Producto</Subtitle>}
          </FlexC>
          <Content>
            <div style={{display:"flex", justifyContent: "flex-end", marginBottom: 10}}>
              <ExportCSV headers={headersExcel} data={products} nameFile={'Productos '} />
            </div>
            <Alert alert={alert} handleClose={toggleAlert} />
            {open ? <AddProduct setOpen={setOpen} setAlert={setAlert} /> 
            :
            <Table
                columns={columns}
                dataSource={products}
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

export default ProductsContent;
