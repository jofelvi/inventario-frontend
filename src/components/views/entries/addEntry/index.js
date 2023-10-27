import { useRef, useState, useEffect } from 'react';
import { addEntry } from '@services/api/entry';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
import { useAuth } from '@hooks/useAuth';

export default function AddEntry({ setOpen, setAlert}) {
  const formRef = useRef(null);
  const [mainInventory, setMainInventory] = useState([]);
  const auth = useAuth();
  const router = useRouter();
  const [stores, setStores] = useState()
  const [storeTo, setStoreTo] = useState()
  const [storeFrom, setStoreFrom] = useState()
  const [materialsByStore, setMaterialsByStore] = useState()

  const user = {
    id: auth?.user?._id,
    name: auth?.user?.name,
    email: auth?.user?.email,
  };

  useEffect(() => {
    async function getInventoryAndMaterials() {
      const response = await axios.get(endPoints.material.getMaterials);
      console.log(response.data)
    }
    try {
      getInventoryAndMaterials();
      getStores()
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getMaterialsByStore(storeFrom)
  }, [storeFrom]);

  const getMaterialsByStore = async (id) => {
    console.log({id})
    const responseInventory = await axios.get(endPoints.inventory.getMaterialsByStore(id));
    setMaterialsByStore(responseInventory.data);

    console.log({responseInventory})
  }
  const getStores = async ()=> {
    try {
      const response = await axios.get(endPoints.store.getStores);
      const storesActives = response.data.filter((item)=> item.status === "active")
      setStores(storesActives);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);

      const data = {
        materialId: formData.get('materialId'),
        materialName: materialsByStore.find((material) => material.materialId === formData.get('materialId'))?.materialName || '',
        quantity: parseFloat(formData.get('quantity')),
        destinationStoreId: storeTo,
        destinationStoreName: stores.find((store) => store._id === storeTo)?.storeName || '',
        sourceStoreId: storeFrom,
        sourceStoreName: stores.find((store) => store._id === storeFrom)?.storeName || '',
        userId: user.email,
        userName: user.name
      };
    console.log({data})
         addEntry(data)
          .then(() => {
            setAlert({
              active: true,
              message: 'Entrada añadida exitosamente',
              type: 'success',
              autoClose: true,
            });
            setOpen(true);
            router.push('/entries');
            formRef.current.reset()

          })
          .catch((error) => {
            console.log({error})
            setAlert({
              active: true,
              message: error.response.data.message,
              type: 'error',
              autoClose: true,
            });
          });

  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
                Sucursal de origen
              </label>
              <select
                id="branch"
                name="branch"
                autoComplete="branch-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={storeFrom}
                onChange={(event) => {
                  const selectId = event.target.value;
                  console.log({selectId})
                  setStoreFrom(selectId)
                }}
              >
                {
                  stores?.map((product) => (
                    <option
                      key= {product._id}
                      value={product._id}
                    >
                      {product.storeName}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3">
            <label htmlFor="materialId" className="block text-sm font-medium text-gray-700">
                Material 
              </label>
              <select
                id="materialId"
                name="materialId"
                autoComplete="materialId-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {
                  materialsByStore?.map((material) => (
                    <option
                      key= {material.materialId}
                      value={material.materialId}
                    >
                      {material.materialName}
                    </option>
                    
                  ))
                }
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Cantidad
              </label>
              <input
                step="any"
                type="number"
                name="quantity"
                id="quantity"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
                Sucursal de destino
              </label>
              <select
                id="branchTo"
                name="branchTo"
                autoComplete="branch-name-to"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={storeTo}
                onChange={(event) => {
                  const selectId = event.target.value;
                  setStoreTo(selectId)
                }}
              >
                {
                  stores?.map((product) => (
                    <option
                      key= {product._id}
                      value={product._id}
                    >
                      {product.storeName}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
}
