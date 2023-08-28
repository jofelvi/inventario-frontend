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
  
  const user = {
    id: auth?.user?._id,
    email: auth?.user?.email,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);

      const data = {
        userId: user.email,
        bill: formData.get('bill'),
        providerName: formData.get('provider'),
        total_price: parseFloat(formData.get('total_price')),
      };

      console.log(data);

        addOrder(data)
          .then((response) => {
            console.log('response', response);
            setAlert({
              active: true,
              message: 'Orden añadida exitosamente',
              type: 'success',
              autoClose: true,
            });
            setOpen(true);
            router.push('/orders');
          })
          .catch((error) => {
            setAlert({
              active: true,
              message: error.message,
              type: 'error',
              autoClose: true,
            });
          }); 
    formRef.current.reset();
  };

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
