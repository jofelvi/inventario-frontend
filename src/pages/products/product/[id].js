import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AddProduct from '@components/views/products/addProduct/index';
import endPoints from '@services/api';
import Sidebar from '@components/sidebar/Sidebar'
import { Main, Content, BackgroundContainer, Title, Subtitle, FlexC} from '@components/views/products/styles';


const ProductDetail = () => {

  const router = useRouter();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getProduct() {
      const response = await axios.get(endPoints.products.getProduct(id));
      setProduct(response.data);
      console.log(response.data);
    }
    
    getProduct();

  }, [router?.isReady]);


  return (
    <Main>
    <Sidebar />
    <BackgroundContainer>
    <FlexC>
      <Title>Componentes de {product.name}</Title> 
      <Link href={'/products'}>
        <Subtitle>Atras</Subtitle>
      </Link>
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

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {product?.materials?.map((item) => (
                    <tr key={`Inventory-item-${item.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.materialName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.quantity}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
      </Content>
    </BackgroundContainer>
  </Main>
  );
};

export default ProductDetail;