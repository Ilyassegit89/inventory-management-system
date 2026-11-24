import { useState , useEffect, useMemo } from 'react';
import products from "../../data/products";
import type {Product} from '../../types/Product'
import  ProductForm from "../../components/common/ProductForm.tsx";
import StockToggle from "../../components/common/StockToggle.tsx";
import ConfirmModal from "../../components/common/ConfirmModal.tsx";
import usePagination from '../../hooks/usePagination.ts'
import renderProductRows from "../../features/products/ProductTable.tsx"
import renderSummaryCards from "../../features/products/ProductSummaryCards.tsx"


function ProductsPage() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedProductId , setSelectedProductId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfModalOpen, SetConfModalOpen] = useState(false);

    const [productsList, setProductsList] = useState<Product[]>(products)
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [inStock, setInStock] = useState(true);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    // Tracks whether products have finished loading
    const [isLoaded, setIsLoaded] = useState(false);

    
    // Load saved products when the component first opens
    useEffect(() => {
        console.log('Products state changed:', productsList);

         // Get products saved in the browser
        const savedProducts = localStorage.getItem('products');

        if(savedProducts !== null){
              // Convert saved JSON data back into a JavaScript array
            const parsedProducts = JSON.parse(savedProducts);
            // Update the products state with saved products
            setProductsList(parsedProducts)
        }
        // Mark loading as finished
        setIsLoaded(true);
    }, []);

    // Save products whenever the products list changes
    useEffect(() => {
        // Don't save until the initial loading is finished
        if (!isLoaded) return;

        // Convert products into JSON and save them in the browser
        localStorage.setItem('products', JSON.stringify(productsList))

    }, [productsList, isLoaded])


    const totalStock = useMemo(() => {
        return  productsList.reduce(
          (total, product) => total + product.quantity, 0)
    }, [productsList])
    

    const sortedAndFilteredProducts : Product[] = useMemo(() => {
        //Filter By Peoduct Name
        let result = productsList.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        
        )

        //Filter BY Category
         if(selectedCategory !== ''){
            result = result.filter(product =>
                 product.category === selectedCategory
        )} 

        //Filter by Stock
        const productsInStock = result.filter(product => product.quantity > 5);
        const productsInLowStock = result.filter(product => product.quantity < 5);

        result = inStock ? productsInStock : productsInLowStock;

        result = [...result].sort((a, b) => {
            return sortOrder === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        })
        return result 
    }, [productsList, searchTerm, sortOrder, selectedCategory, inStock])

     // ===== Pagination =====

    const pagination = usePagination(sortedAndFilteredProducts, 5);

     console.log('total Pages', pagination.totalPages)//4


        useEffect(() => {
        console.log("Current Page:", pagination.currentPage);
    }, [pagination.currentPage]);

   


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
        // Find the product before deleting it
    const removedProduct = productsList.find(product => product.id === id);

        setProductsList(prevProduct => 
            prevProduct.filter(product => product.id !== id)
        )

        SetConfModalOpen(false);
         console.log('Removed product:', removedProduct);

    }  

   const handleOpenConfirmModal = (id : number) => {
        setSelectedProductId(id);
        SetConfModalOpen(true)
        console.log('Opened model')
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
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition "
                >
                    + Add Product
                </button>
                
            </div>

            
            {/* <!-- Summary Cards -->  */}
            <div id="summary-cards" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                 {renderSummaryCards(productsList, totalStock)}

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

                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} name="category">
                            <option value="">All Categories</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Monitors">Monitors</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                        <StockToggle  inStock={inStock} onToggle={() => setInStock(prev => !prev)}/>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                        >
                            <option value="asc">Name: A-Z</option>
                            <option value="desc">Name: Z-A</option>
                        </select>
                        
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


                            {
                                pagination.currentProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-8 text-slate-500">No products found.</td>
                                    </tr>
                                ) : (
                                    renderProductRows(pagination.currentProducts, handleOpenConfirmModal,handleOpenEditModal )
                                )
                            }
                           

                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between p-5 border-t border-slate-200">
                    <p className="text-sm text-slate-500">
                        Showing {pagination.startItem} to {pagination.endItem} of {sortedAndFilteredProducts.length} products
                    </p>

                    <div className="flex gap-2">
                        <button onClick={pagination.handlePreviousPage}  disabled={pagination.currentPage === 1}
                        className={`border rounded-lg px-3 py-1 text-sm ${
                            pagination.currentPage === 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-slate-600 hover:bg-gray-100'
                        }`}>
                            Previous
                        </button>
                        {pagination.visiblePages.map((page, index) => (
                        <button
                            key={`${page}-${index}`}
                            disabled={page === "..."}
                            onClick={() => {
                                if (typeof page === "number") {
                                    pagination.setCurrentPage(page);
                                }
                            }}
                            className={`rounded-lg px-3 py-1 text-sm ${
                                page === pagination.currentPage
                                    ? 'bg-blue-600 text-white'
                                    : page === "..."
                                        ? 'cursor-default text-slate-500'
                                        : 'border border-slate-300 text-slate-600 hover:bg-gray-100'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                        
                        
                        <button disabled={pagination.currentPage === pagination.totalPages}  onClick={pagination.handleNextPage}  className={`border rounded-lg px-3 py-1 text-sm ${
                            pagination.currentPage === pagination.totalPages
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-slate-600 hover:bg-gray-100'
                        }`}>
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

            {isConfModalOpen && selectedProductId !== null  && (
                <ConfirmModal productId={selectedProductId} onClose={() => SetConfModalOpen(false)} onDelete={handleDeleteProduct} />
            )}

        </div>
    );
    

  
}


export default ProductsPage;





