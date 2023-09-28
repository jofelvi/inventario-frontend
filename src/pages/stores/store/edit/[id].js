import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AddOrderItem from '@components/views/orders/addOrderItem/index';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar'
import { 
  Main,
  Content,
  BackgroundContainer, 
  Title,
  Subtitle,
  FlexC,
  Aling
 } from './styles';
import useAlert from "@hooks/useAlert";

const Edit = () => {
  const router = useRouter();
  const [storeDetails, setStoreDetails] = useState()
  const { id } = router.query;
  const [newStoreName, setNewStoreName] = useState('');
  const { alert, setAlert, toggleAlert } = useAlert();

  useEffect(() => {
    if (!router.isReady) return;
    async function getStoreDetail() {
      const response = await axios.get(endPoints.store.getStore(id));
      console.log(response.data)
      setStoreDetails(response.data);
    }
    getStoreDetail();
  }, [id]);

  const handleUpdateStoreName = async () => {
    try {
      const response = await axios.put(endPoints.store.updateStore(id), {
        storeName: newStoreName,
      });
      setAlert({
        active: true,
        message: 'Sucursal Actualizada exitosamente',
        type: 'success',
        autoClose: true,
      });
      router.push('/stores')
    } catch (error) {
      console.error('Error updating store name:', error);
      // Puedes manejar los errores aquí, por ejemplo, mostrar una notificación de error.
    }
  };

  return (
    <Main>
    <Sidebar />
    <BackgroundContainer>
    <FlexC>
      <Title>Editar Sucursal</Title>
      <Link href={'/stores'}>
        <Subtitle>Atras</Subtitle>
      </Link> 
    </FlexC>
      <Content>
        <span>Nombre Sucursal: <b>{storeDetails?.storeName}</b></span>
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
                Nombre de la Tienda
              </label>
              <input
                type="text"
                placeholder="Nuevo nombre de la tienda"
                value={newStoreName}
                onChange={(e) => setNewStoreName(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="flex  py-3 text-right sm:px-6">
              <button
                type="submit"
                onClick={handleUpdateStoreName}
                className="inline-flex mt-3 justify-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </Content>
    </BackgroundContainer>
  </Main>
  );
};

export default Edit;