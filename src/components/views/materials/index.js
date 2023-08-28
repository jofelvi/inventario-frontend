import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar';
import {
  Main,
  Content,
  BackgroundContainer,
  Table,
  Title,
  Subtitle,
  FlexC,
  Space,
  FlexR,
  UserContainer,
  UserLabel
} from '@components/views/materials/styles';
import AddMaterial from '@components/views/materials/addMaterial/index';
import { deleteMaterial } from '@services/api/materials';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAuth } from '@hooks/useAuth';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';



const MaterialsContent = () => {
  const [open, setOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
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
      render: (text) => <a>{text}</a>,
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
          <Link href={`/products/materials/edit/${record._id}`}>
            <EditOutlined />
          </Link>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    async function getMaterials() {
      const response = await axios.get(endPoints.material.getMaterials);
      setMaterials(response.data);
      setTotalItems(response.data.length);
      console.log(response.data);
    }
    try {
      getMaterials();
    } catch (error) {
      console.log(error);
    }
  }, [alert]);

  const handleDelete = (id) => {
    console.log(id);
    deleteMaterial(id)
      .then(() => {
        setAlert({
          active: true,
          message: 'Material Eliminado Exitosamente',
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
            <Title>Materiales</Title>
            <UserContainer>
            <Avatar size="small" icon={<UserOutlined />} />
            <UserLabel>{userData.name}</UserLabel>
            </UserContainer>
            </FlexR>
            {open ? <Subtitle onClick={() => setOpen(false)}>Atras</Subtitle> : <Subtitle onClick={() => setOpen(true)}>Añadir Material</Subtitle>}
          </FlexC>
          <Content>
            <Alert alert={alert} handleClose={toggleAlert} />
            {open ? <AddMaterial setOpen={setOpen} setAlertProps={setAlert} /> 
            :
            <Table
              columns={columns}
              dataSource={materials}
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

export default MaterialsContent;
