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
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ProductsContent = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const { alert, setAlert, toggleAlert } = useAlert();
  const [totalItems, setTotalItems] = useState(0);

  /*const products = useFetch(endPoints.product.getproducts);
  console.log(products);*/

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
  ];

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(endPoints.products.getProducts);
      console.log(response.data);
      setProducts(response.data);
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
            <Title>Productos</Title>
            {open ? <Subtitle onClick={() => setOpen(false)}>Atras</Subtitle> : <Subtitle onClick={() => setOpen(true)}>Añadir Producto</Subtitle>}
          </FlexC>
          <Content>
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
