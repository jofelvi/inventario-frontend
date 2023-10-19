import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar'
import { Main, Content, BackgroundContainer, Table, Title, Subtitle, FlexC, Space } from '@components/views/products/styles';


const StoreDetail = () => {

  const router = useRouter();
  const [storeDetails, setStoreDetails] = useState()
  const { id } = router.query;

  useEffect(() => {
    getStoreDetails();
  }, [id]);

  const getStoreDetails = async () =>{
    const response = await axios.get(endPoints.store.getStore(id));
    setStoreDetails(response.data);
    console.log(response.data)
  }
  storeDetails
    return (
      <Main>
        <Sidebar />
        <BackgroundContainer>
          <FlexC>
            <Title> {storeDetails?.storeName || 'hola'}</Title>
            <Link href={'/stores'}>
              <Subtitle>Atras</Subtitle>
            </Link>
          </FlexC>
          <Content>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre del almacen
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  <tr key={`Inventory-item-${storeDetails?.id}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{storeDetails?.storeName}</div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">status: {storeDetails?.status === 'active'?  'activa' : 'No activa'}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
              </tbody>
            </table>
          </Content>
        </BackgroundContainer>
      </Main>
  );
};

export default StoreDetail;