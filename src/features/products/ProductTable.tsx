import type {Product} from '../../types/Product'




export default function renderProductRows(
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