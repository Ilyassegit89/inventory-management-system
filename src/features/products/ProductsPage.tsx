import { useState , useEffect, useMemo } from 'react';
import products from "../../data/products";
import type {Product} from '../../types/Product'
import  ProductForm from "../../components/common/ProductForm.tsx";
import StockToggle from "../../components/common/StockToggle.tsx";
import ConfirmModal from "../../components/common/ConfirmModal.tsx";


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
    //Pagination 
    const [currentPage, SetCurrentPage] = useState(1);

    
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

        const productsPerPage = 5;

        // Calculate the total number of pages
        const totalPages = Math.ceil(
            sortedAndFilteredProducts.length / productsPerPage
        )

        console.log('total Pages', totalPages)//4


        const visiblePages : (number | string)[] = [];
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1 )

        // Always show the first page
        visiblePages.push(1);

        if (startPage > 2) {
            visiblePages.push("...");
        }

        // Add pages around the current page
        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }

        // Show dots if there are hidden pages after
        if (endPage < totalPages - 1) {
            visiblePages.push("...");
        }

        // Always show the last page (if there is more than one)
        if (totalPages > 1) {
            visiblePages.push(totalPages);
        }
        

        // Calculate which products to display
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const currentProducts = sortedAndFilteredProducts.slice(
            startIndex,
            endIndex
        );

        // Get products for the current page

         const startItem = startIndex + 1;
        const endItem = Math.min(
            startIndex + currentProducts.length,
            sortedAndFilteredProducts.length
        );

        useEffect(() => {
        console.log("Current Page:", currentPage);
    }, [currentPage]);

    // ===== Pagination Actions =====
    const handleNextPage  = () => {
        SetCurrentPage(prev => Math.min(prev + 1, totalPages))
    }
    const handlePreviousPage = () => {
        SetCurrentPage(prev => Math.max(prev - 1, 1));
    };


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
                                currentProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-8 text-slate-500">No products found.</td>
                                    </tr>
                                ) : (
                                    renderProductRows(currentProducts, handleOpenConfirmModal,handleOpenEditModal )
                                )
                            }
                           

                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between p-5 border-t border-slate-200">
                    <p className="text-sm text-slate-500">
                        Showing {startItem} to {endItem} of {sortedAndFilteredProducts.length} products
                    </p>

                    <div className="flex gap-2">
                        <button onClick={handlePreviousPage}  disabled={currentPage === 1}
                        className={`border rounded-lg px-3 py-1 text-sm ${
                            currentPage === 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-slate-600 hover:bg-gray-100'
                        }`}>
                            Previous
                        </button>
                        {visiblePages.map((page, index) => (
                        <button
                            key={`${page}-${index}`}
                            disabled={page === "..."}
                            onClick={() => {
                                if (typeof page === "number") {
                                    SetCurrentPage(page);
                                }
                            }}
                            className={`rounded-lg px-3 py-1 text-sm ${
                                page === currentPage
                                    ? 'bg-blue-600 text-white'
                                    : page === "..."
                                        ? 'cursor-default text-slate-500'
                                        : 'border border-slate-300 text-slate-600 hover:bg-gray-100'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                        
                        
                        <button disabled={currentPage === totalPages}  onClick={handleNextPage}  className={`border rounded-lg px-3 py-1 text-sm ${
                            currentPage === totalPages
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

function renderSummaryCards(productList: Product[], totalStock: number) {
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
                    {totalStock}
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
    onOpenConfModel : ( id: number) => void, 
    onEdit : (id: number) => void,
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
                        <button onClick={() => onOpenConfModel(product.id)} data-id={product.id} className="delete-product-button text-red-600 hover:text-red-800 ml-3">Delete</button>
                    </td>

                </tr>
            ))}
        </>
        
    )
      
}
