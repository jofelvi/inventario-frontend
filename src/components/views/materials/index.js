import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar';
import { Main, Content, BackgroundContainer, Table, Title, Subtitle, FlexC, Space, FlexR, UserContainer, UserLabel } from '@components/views/materials/styles';
import AddMaterial from '@components/views/materials/addMaterial/index';
import { deleteMaterial } from '@services/api/materials';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAuth } from '@hooks/useAuth';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import ExportCSV from "@components/ExcelExport/exportCSV.js/exportCSV.";

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
      render: (_, record) => <Link href={`/products/materials/${record._id}`}>
        {record.name}  {record.unit}
      </Link>,
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

  const headersExcel = [
    { label: "name", key: "name" },
    { label: "price", key: "price" },
    { label: "unit", key: "unit" },
  ];

  useEffect(() => {
    async function getMaterials() {
      const response = await axios.get(endPoints.material.getMaterials);
      setMaterials(response.data.reverse());
      setTotalItems(response.data.length);
    }
    try {
      getMaterials();
    } catch (error) {
      console.log(error);
    }
  }, [open, alert]);

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
            <div style={{display:"flex", justifyContent: "flex-end", marginBottom: 10}}>
              {materials && <ExportCSV headers={headersExcel} data={materials} nameFile={'Materiales '} />}
            </div>
            <Alert alert={alert} handleClose={toggleAlert} />
             {open ? (
              <AddMaterial setOpen={setOpen} setAlertProps={setAlert} />
            ) : (
              <Table
                columns={columns}
                dataSource={materials}
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

export default MaterialsContent;
