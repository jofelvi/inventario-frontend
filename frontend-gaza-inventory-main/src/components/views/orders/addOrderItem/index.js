import { useRef, useState, useEffect } from 'react';
import { addOrderItem } from '@services/api/orders';
import axios from 'axios';
import endPoints from '@services/api';
import {
  updateMainInventory,
  addMainInventory,
} from '@services/api/inventory';

export default function AddOrderItem({ setOpen, setAlert, order}) {
  const formRef = useRef(null);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    async function getMaterial() {
      const response = await axios.get(endPoints.material.getMaterials);
      setMaterials(response.data);
    }
    try {
      getMaterial();
    } catch (error) {
      console.log(error);
    }
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
        orderId: order.id,
        quantity: parseFloat(formData.get('quantity')),
        materialId: parseInt(formData.get('materialId')),
      };

      console.log('data', data);

      addOrderItem(data)
          formRef.current.reset();
          async function updateInventory() {
            const response = await axios.get(endPoints.mainInventory.getMainInventorys);
            const mainInventory = response.data;   
            if (mainInventory.find(inventario => inventario.material?.id === parseInt(formData.get('materialId')))){
              mainInventory.map((inventario) => {
                if (inventario.material.id === parseInt(formData.get('materialId'))){
                  const newQuantity = inventario.quantity + parseFloat(formData.get('quantity'));
                  const data = {
                    quantity: newQuantity
                  }
                  updateMainInventory(inventario.id, data)
                }
              })
            }else {
              const body = {
                quantity: parseFloat(formData.get('quantity')),
                materialId: parseInt(formData.get('materialId')),
              }
              console.log(body);
              addMainInventory(body);
            }
        }
          updateInventory();
        };

    


  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
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
                  materials?.map((material) => (
                    <option
                    key= {material?.id}
                    value={material?.id}
                    >
                      {material?.name}
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
