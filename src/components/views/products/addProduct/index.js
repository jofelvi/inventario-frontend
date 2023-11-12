import {useEffect, useRef, useState} from 'react';
import { addProduct, updateProduct } from '@services/api/products';
import { useRouter } from 'next/router';
import axios from "axios";
import endPoints from "@services/api";

export default function AddProduct({ setOpen, setAlert, product }) {
  const formRef = useRef(null);
  const router = useRouter();
  const [stores, setStores] = useState()
  const [store, setStore] = useState()
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const selectedBranchId = formData.get('branch');
    const selectedBranch = stores.find((branch) => branch._id === store);
    const data = {
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      unit: formData.get('unit'),
      storeName: selectedBranch?.storeName || '',
      storeId: store || selectedBranchId,
    };
    if (product) {
      updateProduct(product._id, data).then(() => {
        router.push('/products');
      });
    } else {
      addProduct(data)
        .then(() => {
          setAlert({
            active: true,
            message: 'Producto añadido exitosamente',
            type: 'success',
            autoClose: false,
          });
          setOpen(false);
        })
        .catch((error) => {
          setAlert({
            active: true,
            message: error.message,
            type: 'error',
            autoClose: false,
          });
        });
      formRef.current.reset();
    }
  };

  useEffect(() => {
    getStores()
  }, []);

  const getStores = async ()=> {
    try {
      const response = await axios.get(endPoints.store.getStores);
      console.log(response.data)
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                defaultValue={product?.name}
                type="text"
                name="name"
                id="name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Precio
              </label>
              <input
                defaultValue={product?.price}
                step="any"
                type="number"
                name="price"
                id="price"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                Unidad
              </label>
              <input
                defaultValue={product?.unit}
                type="text"
                name="unit"
                id="unit"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          {/*  <div className="col-span-6 sm:col-span-3">
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                Cantidad Inicial
              </label>
              <input
                defaultValue={product?.quantity}
                type="text"
                name="quantity"
                id="unit"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>*/}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
                Sucursal que pertenecen los materiales
              </label>
              <select
                id="branch"
                name="branch"
                autoComplete="branch-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={store}
                onChange={(event) => {
                  const selectId = event.target.value;
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
        <div className="px-4 py-3  text-right sm:px-6">
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
