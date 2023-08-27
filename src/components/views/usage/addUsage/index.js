import { useRef, useState, useEffect } from 'react';
import { addUsage } from '@services/api/usage';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
import { useAuth } from '@hooks/useAuth';
const branches = [
  { _id: '1', name: 'Miranda' },
  { _id: '2', name: 'Juncal' },
];
export default function AddUsage({ setOpen, setAlert}) {
  const formRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [sucursales, setSucursales] = useState(branches);
  
  const auth = useAuth();
  const router = useRouter();
  const user = {
    id: auth?.user?._id,
    email: auth?.user?.email,
  };

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(endPoints.products.getProducts);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getProducts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const selectedProductId = formData.get('productId');
    const selectedProduct = products.find((product) => product._id === selectedProductId);
    const selectedBranchId = formData.get('branch');
    const selectedBranch = sucursales.find((branch) => branch._id === selectedBranchId);
    const quantity = parseFloat(formData.get('quantity'));

    const data = {
      userId: user.email,
      productName: selectedProduct?.name || '',
      productId: parseInt(selectedProductId),
      storeName: selectedBranch?.name || '',
      storeId: selectedBranchId,
      quantity,
    };

    try {
      await addUsage(data);
      setAlert({
        active: true,
        message: 'Consumo añadido exitosamente',
        type: 'success',
        autoClose: true,
      });
      setOpen(true);
      router.push('/products/usage');
    } catch (error) {
      setAlert({
        active: true,
        message: error.message,
        type: 'error',
        autoClose: true,
      });
    }

    formRef.current.reset();
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
            <label htmlFor="productId" className="block text-sm font-medium text-gray-700">
                Producto 
              </label>
              <select
                id="productId"
                name="productId"
                autoComplete="productId-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {
                  products?.map((product) => (
                    <option
                    key= {product._id}
                    value={product._id}
                    >
                      {product.name}
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
                <option value="1" data-branch="Miranda">Miranda</option>
                <option value="2" data-branch="Juncal">Juncal</option>
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


/*  async function updateInventorysId() {
      if(formData.get('branch') === 'Miranda') {
        const response = await axios.get(endPoints.mirandaInventory.getMirandaInventorys);
        const inventoryMiranda = response.data;

          inventoryMiranda.map((inventario) => {
            product.materials.map((materialProduct) => {
              if (inventario.material.id === materialProduct.material.id){
                const total = materialProduct.quantity * parseFloat(formData.get('quantity'));
                console.log(total, materialProduct.quantity, parseFloat(formData.get('quantity')) )
                const newQuantity = inventario.quantity - total;
                console.log(inventario.quantity);
                const dataMiranda = {
                  quantity: newQuantity
                }
                updateMirandaInventory(inventario.id, dataMiranda);
              }
            })
          })
        
      }else if(formData.get('branch') === 'Juncal') {

      
       const response = await axios.get(endPoints.juncalInventory.getJuncalInventorys);
        const inventoryJuncal = response.data;

        inventoryJuncal.map((inventario) => {
          product.materials.map((materialProduct) => {
            if (inventario.material.id === materialProduct.material.id){
              const total = materialProduct.quantity * parseFloat(formData.get('quantity'));
              console.log(total, materialProduct.quantity, parseFloat(formData.get('quantity')) )
              const newQuantity = inventario.quantity - total;
              console.log(inventario.quantity);
              const dataJuncal = {
                quantity: newQuantity
              }
              updateJuncalInventory(inventario.id, dataJuncal);
            }
          })
        })
      }
    } */
    //updateInventorysId();