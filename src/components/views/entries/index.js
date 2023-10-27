import { useEffect, useState } from 'react';
import axios from 'axios';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar';
import { Main, Content, BackgroundContainer,  FlexR,UserContainer,UserLabel, Title, Subtitle, FlexC, Space } from '@components/views/entries/styles';
import AddEntry from '@components/views/entries/addEntry/index';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import { useAuth } from '@hooks/useAuth';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import ExportCSV from "@components/ExcelExport/exportCSV.js/exportCSV.";

const EntryContent = () => {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const { alert, setAlert, toggleAlert } = useAlert();

  const auth = useAuth();

  const userData = {
    name: auth?.user?.name,
    email: auth?.user?.email,
    role: auth?.user?.role,
  };

  useEffect(() => {
    async function getEntries() {
      const response = await axios.get(endPoints.entries.getEntries);
      setEntries(response.data.reverse());
    }
    try {
      getEntries();
    } catch (error) {
      console.log(error);
    }
  }, [alert]);

  const headersExcel = [
    { label: "createAt", key: "createAt" },
    { label: "sourceStoreName", key: "sourceStoreName" },
    { label: "materialName", key: "materialName" },
    { label: "quantity", key: "quantity" },
    { label: "destinationStoreName", key: "destinationStoreName" },
  ];

  return (
    <>
      <Main>
        <Sidebar />
        <BackgroundContainer>
          <FlexC>
          <FlexR>
            <Title>Entradas</Title>
            <UserContainer>
            <Avatar size="small" icon={<UserOutlined />} />
            <UserLabel>{userData.name}</UserLabel>
            </UserContainer>
            </FlexR>
            {open ? <Subtitle onClick={() => setOpen(false)}>Atras</Subtitle> : <Subtitle onClick={() => setOpen(true)}>Añadir Entrada</Subtitle>}
          </FlexC>
          <Content>
            <div style={{display:"flex", justifyContent: "flex-end", marginBottom: 10}}>
              {entries && <ExportCSV headers={headersExcel} data={entries} nameFile={'Entradas '} />}
            </div>
            <Alert alert={alert} handleClose={toggleAlert} />
            {open ? <AddEntry setOpen={setOpen} setAlert={setAlert} /> 
            :
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sucursal Origen
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Material
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cantidad
                    </th>
                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sucursal Destino
                    </th>

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {entries.length >0 && entries?.map((entry) => (
                    <tr key={`Entry-item-${entry.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{entry?.createAt?.substring(0, 10)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{entry?.sourceStoreName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex entrys-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{entry?.materialName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{entry.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{entry.userId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">{entry.destinationStoreName}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            
            }
          </Content>
        </BackgroundContainer>
      </Main>
    </>
  );
};

export default EntryContent;
