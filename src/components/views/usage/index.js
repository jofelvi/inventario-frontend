import { useEffect, useState } from 'react';
import axios from 'axios';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar';
import { Main, Content, BackgroundContainer, Title, Subtitle, FlexC } from '@components/views/entries/styles';
import AddUsage from '@components/views/usage/addUsage/index';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';

const UsageContent = () => {
  const [open, setOpen] = useState(false);
  const [usage, setUsage] = useState([]);
  const { alert, setAlert, toggleAlert } = useAlert();

  useEffect(() => {
    async function getUsage() {
      const response = await axios.get(endPoints.usage.getUsages);
      setUsage(response.data);
      console.log(response.data);
    }
    try {
      getUsage();
    } catch (error) {
      console.log(error);
    }
  }, [alert]);

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
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
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
                  {usage.map((item) => (
                    <tr key={`Usage-item-${item._id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{new Date(item.date).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.userId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.quantity} {item.unit}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">{item.storeName}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Content>
        </BackgroundContainer>
      </Main>
    </>
  );
};

export default UsageContent;
