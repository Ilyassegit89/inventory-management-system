interface StockToggleProps  {
    inStock : boolean;
    onToggle: () => void;

}

function StockToggle({inStock, onToggle} : StockToggleProps){
    return(
          <div className="flex items-center gap-2">
            <button
                type="button"
               onClick={onToggle}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    inStock ? "bg-green-500" : "bg-red-500"
                }`}
            >
                <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                        inStock ? "translate-x-6" : "translate-x-0"
                    }`}
                />
            </button>

            <span className={`text-sm font-medium ${
                inStock ? "text-green-600" : "text-red-600"
            }`}>
                {inStock ? "In Stock" : "Low Stock"}
            </span>
        </div>
    )
}

 export default StockToggle;