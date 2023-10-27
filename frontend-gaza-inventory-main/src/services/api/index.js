const API = process.env.NEXT_PUBLIC_API_URL;

const endPoints = {
    auth: {
        login: `${API}/auth/login`,
        signUp: `${API}/auth/signUp`,
        profile: `${API}/profile`
    },
    products: {
        getProduct: (id) => `${API}/products/${id}`,
        getProducts: `${API}/products`,
        addProducts: `${API}/products`,
        updateProduct: (id) => `${API}/products/${id}`,
        deleteProduct: (id) => `${API}/products/${id}`,
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
        getOrder: (id) => `${API}/orders/${id}`,
        getOrders: `${API}/orders`,
        addOrders: `${API}/orders`,
        deleteOrder: (id) => `${API}/orders/${id}`,
    },
    orderItems: {
        getOrderItems: (id) => `${API}/order-item/${id}`,
        getOrdersItems: `${API}/order-item`,
        addOrderItems: `${API}/order-item`,
        deleteOrderItems: (id) => `${API}/order-item/${id}`,
    },
    entries: {
        getEntrie: (id) => `${API}/entries/${id}`,
        getEntries: `${API}/entries`,
        addEntries: `${API}/entries`,
        updateEntrie: (id) => `${API}/entries/${id}`,
        deleteEntrie: (id) => `${API}/entries/${id}`,
    },
    material: {
        getMaterial: (id) => `${API}/material/${id}`,
        getMaterials: `${API}/material`,
        addMaterial: `${API}/material`,
        updateMaterial: (id) => `${API}/material/${id}`,
        deleteMaterial: (id) => `${API}/material/${id}`,
    },
    mainInventory: {
        getMainInventory: (id) => `${API}/mainInventory/${id}`,
        getInventorys: `${API2}/mainInventory`,
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
        getUsage: (id) => `${API}/Usage/${id}`,
        getUsages: `${API}/Usage`,
        addUsage: `${API}/Usage`,
        updateUsage: (id) => `${API}/Usage/${id}`,
        deleteUsage: (id) => `${API}/Usage/${id}`,
    },
    
};

export default endPoints