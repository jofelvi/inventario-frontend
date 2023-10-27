import { useRef } from 'react';
import { addMaterial, updateMaterial } from '@services/api/materials';
import { useRouter } from 'next/router';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';

export default function AddMaterial({ setOpen, setAlertProps, material,isReadOnly }) {
  const formRef = useRef(null);
  const router = useRouter();
  const { alert, setAlert, toggleAlert } = useAlert();


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      unit: formData.get('unit'),
    };

    if (material) {
      console.log({material})
      updateMaterial(material._id, data).then((response) => {
        //router.push('/products/materials/');
        setAlert({
          active: true,
          message: 'Material Editado exitosamente',
          type: 'success',
          autoClose: false,
        });
        toggleAlert(true)
        setTimeout(() => {
          router.push('/products/materials/');
        }, 2000);
      });
    } else {
      addMaterial(data)
        .then(() => {
          setAlert({
            active: true,
            message: 'Material añadido exitosamente',
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

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="overflow-hidden">
      <Alert alert={alert} handleClose={toggleAlert} />
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                defaultValue={material?.name}
                type="text"
                name="name"
                id="name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                disabled={isReadOnly || false}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Precio
              </label>
              <input
                defaultValue={material?.price}
                step="any"
                type="number"
                name="price"
                id="price"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                disabled={isReadOnly || false}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                Unidad
              </label>
              <input
                defaultValue={material?.unit}
                type="text"
                name="unit"
                id="unit"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                disabled={isReadOnly || false}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 text-right sm:px-6">
          {!isReadOnly && (
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Guardar
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
