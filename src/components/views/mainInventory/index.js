import { useEffect, useState } from 'react';
import axios from 'axios';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar';
import { Main, Content, BackgroundContainer, Title, Subtitle, FlexC,   FlexR,
  UserContainer,
  UserLabel } from '@components/views/materials/styles';

  import { useAuth } from '@hooks/useAuth';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Select  } from 'antd';
import ExportCSV from "@components/ExcelExport/exportCSV.js/exportCSV.";

const { Option } = Select;

const MainInventoryContent = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [showAllInventories, setShowAllInventories] = useState(true)

  const auth = useAuth();

  const userData = {
    name: auth?.user?.name,
    email: auth?.user?.email,
    role: auth?.user?.role,
  };
  useEffect(() => {
    console.log(auth.user)
    try {
      getInventory();

    } catch (error) {
      console.log(error);
    }
  }, []);


  const getInventory= async ()=>  {
    const response = await axios.get(endPoints.inventory.getALlInventories());
    console.log(response.data);
    setInventory(response.data.reverse());
  }

  const handleStoreChange = (value) => {
    setSelectedStore(value);
    setShowAllInventories(false)
  };

  const toggleFilters = () => {
    setShowAllInventories(!showAllInventories);
  };

  const uniqueStores = [...new Set(inventory.map(item => item.storeId))];
  console.log({uniqueStores})
  const headersExcel = [
    { label: "storeName", key: "storeName" },
    { label: "materialName", key: "materialName" },
    { label: "quantityTotal", key: "quantityTotal" },
  ];

  return (
    <>
      <Main>
        <Sidebar />
        <BackgroundContainer>
          <FlexC>
          <FlexR>
            <Title>Almacen</Title>
            <UserContainer>
            <Avatar size="small" icon={<UserOutlined />} />
            <UserLabel>{userData.name}</UserLabel>
            </UserContainer>
            </FlexR>
          </FlexC>

          <Content>
            <div style={{display:"flex", justifyContent: "flex-end", marginBottom: 10}}>
              <ExportCSV headers={headersExcel} data={inventory} nameFile={'Inventario '} />
            </div>
            <div style={{display: "flex", justifyContent: "right", marginBottom: 15}}>
              <label>
                <input
                  type="checkbox"
                  checked={showAllInventories}
                  onChange={toggleFilters}
                  style={{marginRight:15}}
                />
                Ver Todos
              </label>
            </div>
            <div style={{display: "flex", justifyContent: "right", marginBottom: 15}}>

              <Select
                style={{ width: 200 }}
                placeholder="Seleccionar tienda"
                onChange={handleStoreChange}
                value={selectedStore}
                labelInValue=''
              >
                {uniqueStores.map(storeId => {
                  const store = inventory.find(item => item.storeId === storeId);
                  return (
                    <Option key={store.storeId} value={store.storeId}>
                      {store.storeName}
                    </Option>
                  );
                })}
              </Select>
            </div>

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
                      Sucursal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                 { showAllInventories ? inventory.map((item) => (
                    <tr key={`Inventory-item-${item.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.materialName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.quantityTotal}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">{item.storeName}</span>
                      </td>
                    </tr>
                  )) : (
                     inventory
                       .filter((item) => !selectedStore || item.storeId === selectedStore)
                       .map((item) => (
                         <tr key={`Inventory-item-${item.id}`}>
                           <td className="px-6 py-4 whitespace-nowrap">
                             <div className="flex items-center">
                               <div className="ml-4">
                                 <div className="text-sm font-medium text-gray-900">{item.materialName}</div>
                               </div>
                             </div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                             <div className="text-sm text-gray-900">{item.quantityTotal}</div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                             <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">{item.storeName}</span>
                           </td>
                         </tr>
                       ))
                 )}
                </tbody>
              </table>
          </Content>
        </BackgroundContainer>
      </Main>
    </>
  );
};

export default MainInventoryContent;
