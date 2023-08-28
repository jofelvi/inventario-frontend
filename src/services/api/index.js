const API = process.env.NEXT_PUBLIC_API_URL;
const API2 =  "http://localhost:5000/api"
const endPoints = {
    auth: {
        login: `${API2}/auth/login`,
        signUp: `${API}/auth/signUp`,
        signUp2: `${API2}/usuarios`,
        me: `${API2}/auth/me`,
        profile: `${API}/profile`
    },
    products: {
        getProduct: (id) => `${API2}/products/${id}`,
        getProducts: `${API2}/products`,
        addProducts: `${API2}/products`,
        updateProduct: (id) => `${API2}/products/${id}`,
        deleteProduct: (id) => `${API2}/products/${id}`,
    },
    productsMaterials: {
        getProductMaterials: (id) => `${API}/product-materials/${id}`,
        getProductsMaterials: `${API}/product-materials`,
        addProductsMaterials: `${API}/product-materials`,
        updateProductMaterials: (id) => `${API}/product-materials/${id}`,
        deleteProductMaterials: (id) => `${API}/product-materials/${id}`,
    },
    users: {
        getUser: (id) => `${API}/users/${id}`,
        getUsers: `${API}/users`,
        addUsers: `${API}/users`,
        updateUser: (id) => `${API}/users/${id}`,
        deleteUser: (id) => `${API}/users/${id}`,
    },
    orders: {
        getOrder: (id) => `${API2}/orders/${id}`,
        getOrders: `${API2}/orders`,
        addOrders: `${API2}/orders`,
        deleteOrder: (id) => `${API2}/orders/${id}`,
    },
    orderItems: {
        getOrderItems: (id) => `${API}/order-item/${id}`,
        getOrdersItems: `${API}/order-item`,
        addOrderItems: `${API}/order-item`,
        deleteOrderItems: (id) => `${API}/order-item/${id}`,
    },
    entries: {
        getEntrie: (id) => `${API}/entries/${id}`,
        getEntries: `${API2}/entries`,
        addEntries: `${API2}/entries`,
        updateEntrie: (id) => `${API2}/entries/${id}`,
        deleteEntrie: (id) => `${API2}/entries/${id}`,
    },
    material: {
        getMaterial: (id) => `${API2}/materials/${id}`,
        getMaterials: `${API2}/materials`,
        addMaterial: `${API2}/materials`,
        updateMaterial: (id) => `${API2}/materials/${id}`,
        deleteMaterial: (id) => `${API2}/materials/${id}`,
    },
    mainInventory: {
        getMainInventory: (id) => `${API}/mainInventory/${id}`,
        getMainInventorys: `${API}/mainInventory`,
        addMainInventory: `${API}/mainInventory`,
        updateMainInventory: (id) => `${API}/mainInventory/${id}`,
        deleteMainInventory: (id) => `${API}/mainInventory/${id}`,
    },
    mirandaInventory: {
        getMirandaInventory: (id) => `${API}/miranda-inventory/${id}`,
        getMirandaInventorys: `${API}/miranda-inventory`,
        addMirandaInventory: `${API}/miranda-inventory`,
        updateMirandaInventory: (id) => `${API}/miranda-inventory/${id}`,
        deleteMirandaInventory: (id) => `${API}/miranda-inventory/${id}`,
    },
    juncalInventory: {
        getJuncalInventory: (id) => `${API}/juncalInventory/${id}`,
        getJuncalInventorys: `${API}/juncalInventory`,
        addJuncalInventory: `${API}/juncalInventory`,
        updateJuncalInventory: (id) => `${API}/juncalInventory/${id}`,
        deleteJuncalInventory: (id) => `${API}/juncalInventory/${id}`,
    },
    usage: {
        getUsage: (id) => `${API}/consumption/${id}`,
        getUsages: `${API2}/consumption`,
        addUsage: `${API2}/consumption`,
        updateUsage: (id) => `${API}/consumption/${id}`,
        deleteUsage: (id) => `${API}/consumption/${id}`,
    },
    
};

export default endPoints