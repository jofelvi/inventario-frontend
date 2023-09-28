import {useEffect, useRef} from 'react';
import { addMaterial, updateMaterial } from '@services/api/materials';
import { useRouter } from 'next/router';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import axios from "axios";
import endPoints from "@services/api";

const AddStore = ({ setOpen, setAlert }) => {
    const formRef = useRef(null);
    const router = useRouter();

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("handleSubmit")
      const formData = new FormData(formRef.current);
      const data = {
        storeName: formData.get('storeName'),
      };
  
      try {
        const response = await axios.post(endPoints.store.addStore, data).then(()=> console.log("response after api call"))
        console.log("response then")
        setAlert({
          active: true,
          message: 'Tienda añadida exitosamente',
          type: 'success',
          autoClose: false,
        });
        console.log("ALert then")
        setOpen(false);
        await router.push("/stores")
      } catch (error) {
        console.log(error)
        setAlert({
          active: true,
          message: error.message,
          type: 'error',
          autoClose: true,
        });
      }
    };
  
    return (
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="overflow-hidden">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
                  Nombre de la Tienda
                </label>
                <input
                  type="text"
                  name="storeName"
                  id="storeName"
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
  };
  
  export default AddStore;