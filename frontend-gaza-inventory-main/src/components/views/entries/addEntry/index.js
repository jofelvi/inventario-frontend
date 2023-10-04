import { useRef, useState, useEffect } from 'react';
import { addEntry } from '@services/api/entry';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
import { useAuth } from '@hooks/useAuth';
import {
  updateMainInventory,
  updateMirandaInventory,
  updateJuncalInventory,
  addJuncalInventory,
  addMirandaInventory
} from '@services/api/inventory';

export default function AddEntry({ setOpen, setAlert}) {
  const formRef = useRef(null);
  const [mainInventory, setMainInventory] = useState([]);
  const auth = useAuth();
  const router = useRouter();
  
  const user = {
    id: auth?.user?.id,
  };

  useEffect(() => {
    async function getInventory() {
      console.log(endPoints.mainInventory.getMainInventorys)
      const response = await axios.get(endPoints.mainInventory.getMainInventorys);
      setMainInventory(response.data);
      console.log({mainInventory})
    }
    try {
      getInventory();
    } catch (error) {
      console.log(error);
    }
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);

    async function getInventoryId() {
      const response = await axios.get(endPoints.mainInventory.getMainInventory(formData.get('materialId')));
      console.log({response})
      const inventory = response.data;
      const materialID = inventory.material.id;

      const totalQuantity = inventory.quantity - parseFloat(formData.get('quantity'));
      const body = {
        quantity: totalQuantity
      }
      updateMainInventory(inventory.id, body);

      const data = {
        branch: formData.get('branch'),
        userId: user.id,
        quantity: parseFloat(formData.get('quantity')),
        materialId: materialID,
      };

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
          })
          .catch((error) => {
            setAlert({
              active: true,
              message: error.message,
              type: 'error',
              autoClose: true,
            });
          });

      if(formData.get('branch') === 'Miranda') {
        const response = await axios.get(endPoints.mirandaInventory.getMirandaInventorys);
        const inventoryMiranda = response.data;

        if (inventoryMiranda.find(inventario => inventario.material.id === materialID)){
          inventoryMiranda.map((inventario) => {
            if (inventario.material.id === materialID){
              const newQuantity = inventario.quantity + parseFloat(formData.get('quantity'));
              const dataMiranda = {
                quantity: newQuantity
              }
              updateMirandaInventory(inventario.id, dataMiranda);
            }
          })
        }else {
          const body = {
            quantity: parseFloat(formData.get('quantity')),
            materialId: materialID,
          }
          console.log(body);
          addMirandaInventory(body).then((response) => {
          });
        }

      }else if(formData.get('branch') === 'Juncal') {
        const response = await axios.get(endPoints.juncalInventory.getJuncalInventorys);
        const inventoryJuncal = response.data;

        if (inventoryJuncal.find(inventario => inventario.material.id === materialID)){
          inventoryJuncal.map((inventario) => {
            if (inventario.material.id === materialID){
              const newQuantity = inventario.quantity + parseFloat(formData.get('quantity'));
              const dataJuncal = {
                quantity: newQuantity
              }
              updateJuncalInventory(inventario.id, dataJuncal);
            }
          })
        }else {
          const body = {
            quantity: parseFloat(formData.get('quantity')),
            materialId: materialID,
          }
          addJuncalInventory(body);
        }
      }
    }
    getInventoryId();
    formRef.current.reset();


    
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
                  mainInventory?.map((inventory) => (
                    <option
                    key= {inventory.id}
                    value={inventory.id}
                    >
                      {inventory.material.name}
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
                Sucursal
              </label>
            <select
                id="branch"
                name="branch"
                autoComplete="branch-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Miranda">Miranda</option>
                <option value="Juncal">Juncal</option>
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
