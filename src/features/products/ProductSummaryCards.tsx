import type {Product} from '../../types/Product'


export default function renderSummaryCards(productList: Product[], totalStock: number) {
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