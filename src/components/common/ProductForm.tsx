import type { Product } from '../../types/Product';

interface ProductFormProps {
    onClose: () => void;
    onAddProduct: (product: Omit<Product, 'id'>) => void;
    onEditProduct: (id: number, product: Omit<Product, 'id'>) => void;
    productToEdit: Product | null;

}

function ProductForm({ onClose , onAddProduct, productToEdit ,onEditProduct  }: ProductFormProps) {
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const product : Omit<Product, "id"> = {
            name: String(formData.get('name')),
            price: Number(formData.get('price')),
            quantity: Number(formData.get('quantity')),
            category: String(formData.get('category')),
            description: String(formData.get('description'))
        }

        if(productToEdit){
            onEditProduct(productToEdit.id, product)
        }else{
            onAddProduct(product);
        }

        onClose();

    };

    return (
        
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 sm:items-center">

            {/* Modal Content */}
            <div className="my-4 max-h-[calc(100vh-2rem)] w-full max-w-lg shrink-0 overflow-y-auto rounded-xl bg-white shadow-xl">

                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-slate-200 p-6">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">
                            Add New Product
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Enter the product information below.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl text-slate-400 hover:text-slate-700"
                    >
                        &times;
                    </button>
                </div>

                {/* Product Form */}
                <form onSubmit={handleSubmit} className="space-y-5 p-6">

                    {/* Product Name */}
                    <div>
                        <label
                            htmlFor="product-name"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Product Name
                        </label>

                        <input
                            type="text"
                            id="product-name"
                            name="name"
                            defaultValue={productToEdit?.name ?? ''}
                            placeholder="e.g. HP Laptop"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Price and Quantity */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="product-price"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Price (DH)
                            </label>

                            <input
                                type="number"
                                id="product-price"
                                name="price"
                                min="0"
                                defaultValue={productToEdit?.price ?? ''}
                                placeholder="6000"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="product-quantity"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Quantity
                            </label>

                            <input
                                type="number"
                                id="product-quantity"
                                name="quantity"
                                min="0"
                                defaultValue={productToEdit?.quantity ?? ''}
                                placeholder="12"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label
                            htmlFor="product-category"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Category
                        </label>

                        <select
                            id="product-category"
                            name="category"
                            defaultValue={productToEdit?.category ?? ''}
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="">Select a category</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Monitors">Monitors</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="product-description"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Description
                        </label>

                        <textarea
                            id="product-description"
                            name="description"
                            rows={3}
                            placeholder="Product description..."
                            defaultValue={productToEdit?.description ?? ''}
                            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductForm;
