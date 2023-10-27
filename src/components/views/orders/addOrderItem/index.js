import { useRef, useState, useEffect } from 'react';
import {addOrderItem, updateOrder} from '@services/api/orders';
import axios from 'axios';
import endPoints from '@services/api';
import {useAuth} from "@hooks/useAuth";
import {useRouter} from "next/router";
import useAlert from "@hooks/useAlert";
import {addMaterialToProduct} from "@services/api/products";

export default function AddItemToProduct({ isProdut, order, id}) {
  const { alert, setAlert, toggleAlert } = useAlert();
  const formRef = useRef(null);
  const [materials, setMaterials] = useState([]);
  const auth = useAuth();
  const router = useRouter();

  const user = {
    id: auth?.user?._id,
    email: auth?.user?.email,
  };

  const [inventoryItems, setInventoryItems] = useState([
    { materialId: '', quantity: '' },
  ]);

  useEffect(() => {
    !isProdut ? getOrderById() : null
    getMaterials()
  }, []);
  const getMaterialByStore = async (orderIdStore) => {
    const responseMaterials = await axios.get(endPoints.inventory.getMaterialsByStore(orderIdStore));
    //setMaterials(responseMaterials.data);
  }
  const getMaterials= async (orderIdStore) => {
    const responseMaterials = await axios.get(endPoints.material.getMaterials);
    setMaterials(responseMaterials.data);
  }
  const getOrderById = async () => {
    const responseOrder = await axios.get(endPoints.orders.getOrder(id));
    console.log(responseOrder.data)
    getMaterialByStore();
  }
  const handleAddItem = () => {
    setInventoryItems([...inventoryItems, { materialId: '', quantity: '' }]);
  };
  const handleRemoveItem = (index) => {
    const updatedItems = [...inventoryItems];
    updatedItems.splice(index, 1);
    setInventoryItems(updatedItems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);

    const items = inventoryItems.map((item, index) => ({
      materialId: formData.get(`materialId-${index}`),
      materialName: document.querySelector(`#materialId-${index} option:checked`).getAttribute('data-name'),
      quantity: parseFloat(formData.get(`quantity-${index}`)),
    }));

    const data = {
      materials: items,
    };

    const res = updateOrder(id,data).then((res)=>{
      console.log(res)
      setAlert({
        active: true,
        message: 'materiales añadidos exitosamente',
        type: 'success',
        autoClose: true,
      });
      setTimeout(() => {
        formRef.current.reset();
        router.push('/orders');
      }, "1000");

    }).catch((error) => {
      setAlert({
        active: true,
        message: error.message,
        type: 'error',
        autoClose: true,
      });
    });
  }

  return (
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="px-4 py-3 text-right sm:px-6">
          <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
          >
            +
          </button>
        </div>
        <div className="overflow-hidden">
          {inventoryItems.map((item, index) => (
              <div key={index} className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor={`materialId-${index}`} className="block text-sm font-medium text-gray-700">
                      Material
                    </label>
                    <select
                        id={`materialId-${index}`}
                        name={`materialId-${index}`}
                        autoComplete={`materialId-${index}-name`}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {
                        materials.length > 0 && materials?.map((material) => (
                            <option
                                key= {material?._id}
                                value={material?._id}
                                data-name={material?.name}
                            >
                              {material?.name}
                            </option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor={`quantity-${index}`} className="block text-sm font-medium text-gray-700">
                      Cantidad
                    </label>
                    <input
                        step="any"
                        type="number"
                        name={`quantity-${index}`}
                        id={`quantity-${index}`}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                {index > 0 && (
                    <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="mt-2 px-2 py-1 text-sm text-red-600 bg-red-100 rounded-md"
                    >
                      Eliminar
                    </button>
                )}
              </div>
          ))}
          <div className="px-4 py-3 text-right sm:px-6">
            <button
                type="submit"
                className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
  );
}
