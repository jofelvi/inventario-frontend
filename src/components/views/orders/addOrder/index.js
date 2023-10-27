import { useRef, useState, useEffect } from 'react';
import { addOrder } from '@services/api/orders';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
import { useAuth } from '@hooks/useAuth';

export default function AddOrder({ setOpen, setAlert}) {
  const formRef = useRef(null);
  const auth = useAuth();
  const router = useRouter();
  const [stores, setStores] = useState()
  const [store, setStore] = useState()

  const user = {
    id: auth?.user?._id,
    email: auth?.user?.email,
    name: auth?.user?.name
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const selectedBranchId = formData.get('branch');
    const selectedBranch = stores.find((branch) => branch._id === store);
    const selectedBranchDefault = stores.find((branch) => branch._id === selectedBranchId);

      const data = {
        userId: user.email,
        userName: user.name,
        bill: formData.get('bill'),
        providerName: formData.get('provider'),
        total_price: parseFloat(formData.get('total_price').toString()),
        storeName: selectedBranch?.storeName || selectedBranchDefault.storeName,
        storeId: store || selectedBranchId,
      };

      console.log(data);

        addOrder(data)
          .then((response) => {
            setAlert({
              active: true,
              message: 'Orden añadida exitosamente',
              type: 'success',
              autoClose: true,
            });
            setOpen(true);
            router.push('/orders');
            formRef.current.reset();
          })
          .catch((error) => {
            setAlert({
              active: true,
              message: error.message,
              type: 'error',
              autoClose: true,
            });
          });
  };
  useEffect(() => {
    getStores()
  }, []);
  const  getStores = async ()=> {
    try {
      const response = await axios.get(endPoints.store.getStores);
      const storesActives = response.data.filter((item)=> item.status === "active")
      setStores(storesActives);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
            <label htmlFor="bill" className="block text-sm font-medium text-gray-700">
                Factura
              </label>
              <input
                type="text"
                name="bill"
                id="bill"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="provider" className="block text-sm font-medium text-gray-700">
                Proveedor
              </label>
              <input
                type="text"
                name="provider"
                id="provider"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
            <label htmlFor="total_price" className="block text-sm font-medium text-gray-700">
                Precio Total
              </label>
              <input
                step="any"
                type="number"
                name="total_price"
                id="total_price"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
                Sucursal donde van materiales
              </label>
              <select
                id="branch"
                name="branch"
                autoComplete="branch-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={store }
                onChange={(event) => {
                  const selectId = event.target.value;
                  console.log({selectId})
                  setStore(selectId)
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
