import { useEffect, useState } from 'react';
import axios from 'axios';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar';
import { Main, Content, BackgroundContainer, Title, Subtitle, FlexC,  FlexR,
  UserContainer,
  UserLabel } from '@components/views/materials/styles';

  import { useAuth } from '@hooks/useAuth';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';


const JuncalInventoryContent  = () => {
  const [inventory, setInventory] = useState([]);

  const auth = useAuth();

  const userData = {
    name: auth?.user?.name,
    email: auth?.user?.email,
    role: auth?.user?.role,
  };
  
  useEffect(() => {
    async function getInventory() {
      const response = await axios.get(endPoints.juncalInventory.getJuncalInventorys);
      console.log(response.data);
      setInventory(response.data);
      
    }
    try {
      getInventory();
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <>
      <Main>
        <Sidebar />
        <BackgroundContainer>
          <FlexC>
          <FlexR>
            <Title>Sucursal Juncal</Title>
            <UserContainer>
            <Avatar size="small" icon={<UserOutlined />} />
            <UserLabel>{userData.name}</UserLabel>
            </UserContainer>
            </FlexR>
          </FlexC>
          <Content>
          <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Material
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cantidad
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio Total
                    </th>

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventory?.map((item) => (
                    <tr key={`Inventory-item-${item.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.material.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.quantity.toFixed(2)} {item.material.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">${item.total.toFixed(2)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </Content>
        </BackgroundContainer>
      </Main>
    </>
  );
};

export default JuncalInventoryContent;
