import { useState , useEffect } from 'react';
import products from "../../data/products";
import type {Product} from '../../types/Product'
import  ProductForm from "../../components/common/ProductForm.tsx";


function ProductsPage() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productsList, setProductsList] = useState<Product[]>(products)
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
    console.log('Products state changed:', productsList);
}, [productsList]);

    const filteredProducts = productsList.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleAddProduct = (newProduct : Omit<Product, 'id'>) => {
        const product = {
            id: productsList.length > 0 
            ? Math.max(...productsList.map(product => product.id)) + 1
            : 1
            ,
            ...newProduct
        }
        const updatedProducts = [...productsList, product];

        setProductsList(updatedProducts);

    }

    const handleOpenEditModal = (id: number) => {
        const productToEdit = productsList.find(
            product => product.id === id
        );
        console.log(productToEdit);

        if (productToEdit) {
            setSelectedProduct(productToEdit);
            setIsModalOpen(true);
        }

    }

    const handleEditProduct = (
        id: number,
        updatedProduct : Omit<Product, 'id'>
    ) => {
        setProductsList(prevProduct => 
            prevProduct.map(product => 
                product.id === id 
                ? {...product, ...updatedProduct}
                : product
            )
        )
        
    }

    const handleDeleteProduct = (id: number) => {
        setProductsList(prevProduct => 
            prevProduct.filter(product => product.id !== id)
        )

    }

    return (
         <div className="space-y-6">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Products
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage your store products and inventory.
                    </p>
                </div>
                

                <button
                onClick={() => {
                    setIsModalOpen(true)
                      setSelectedProduct(null);
                } }
                id="add-product-button"
                    className=" bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition "
                >
                    + Add Product
                </button>
                
            </div>

            
            {/* <!-- Summary Cards -->  */}
            <div id="summary-cards" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

               
                
                 {/*  ${renderSummaryCards()} */}
                 {renderSummaryCards(productsList)}

            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 border-b border-slate-200">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            All Products
                        </h2>
                        <p className="text-sm text-slate-500">
                            View and manage your products.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <input
                            id="search-product"
                            type="text"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search products..."
                            className="border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button className="border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                            Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">

                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Product</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Price</th>
                                <th className="px-6 py-4 font-medium">Stock</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Actions</th>
                            </tr>
                        </thead>

                        <tbody id="products-table-body" className="divide-y divide-slate-100">
                           
                        {renderProductRows(filteredProducts, handleDeleteProduct,handleOpenEditModal)}

                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between p-5 border-t border-slate-200">
                    <p className="text-sm text-slate-500">
                        Showing 1 to 3 of 124 products
                    </p>

                    <div className="flex gap-2">
                        <button className="border border-slate-300 rounded-lg px-3 py-1 text-sm text-slate-500">
                            Previous
                        </button>
                        <button className="bg-blue-600 text-white rounded-lg px-3 py-1 text-sm">
                            1
                        </button>
                        <button className="border border-slate-300 rounded-lg px-3 py-1 text-sm text-slate-600">
                            2
                        </button>
                        <button className="border border-slate-300 rounded-lg px-3 py-1 text-sm text-slate-600">
                            Next
                        </button>
                    </div>
                </div>

            </div>

            {isModalOpen && (
                <ProductForm
                    onClose={() => setIsModalOpen(false)}
                    onAddProduct = {handleAddProduct}
                    onEditProduct={handleEditProduct}
                    productToEdit={selectedProduct}

                />
            )}

        </div>
    );
    

  
}


export default ProductsPage;

function renderSummaryCards(productList: Product[]) {
    return (
        <>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-500">Total Products</p>
                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                    {productList.length}
                </h2>
                <p className="text-xs text-green-600 mt-2">
                    Products in inventory
                </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-500">Total Stock</p>
                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                    856
                </h2>
                <p className="text-xs text-slate-500 mt-2">
                    Units available
                </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-500">Low Stock Products</p>
                <h2 className="text-3xl font-bold text-red-600 mt-2">
                    {productList.filter(product => product.quantity < 5).length}
                </h2>
                <p className="text-xs text-red-500 mt-2">
                    Need restocking
                </p>
            </div>
        </>
    );
}


function renderProductRows(
    productsList : Product[],
    onDelete : (id : number) => void, 
    onEdit : (id: number) => void
) {
    return(
        <>
            {productsList.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">

                    <td className="px-6 py-4 font-medium text-slate-800">
                        {product.name}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                        {product.category}
                    </td>

                    <td className="px-6 py-4 text-slate-800">
                        {product.price.toLocaleString()} DH
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                        {product.quantity}
                    </td>

                    <td className="px-6 py-4">
                        {product.quantity <= 5
                            ? <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">Low Stock</span>
                            : <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">In Stock</span>
                        }
                    </td>

                    <td className="px-6 py-4">
                        <button onClick={() => onEdit(product.id)} data-id={product.id} className="edit-product-button text-blue-600 hover:text-blue-800" >Edit</button>
                        <button onClick={() => onDelete(product.id)}    data-id={product.id} className="delete-product-button text-red-600 hover:text-red-800 ml-3">Delete</button>
                    </td>

                </tr>
            ))}
        </>
        
    )
      
}
