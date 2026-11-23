interface ConfimModelProps{
    onClose : () => void;
    productId: number
    onDelete : (id : number) => void;
}

function ConfirmModal({onClose, productId, onDelete} : ConfimModelProps) {

    console.log(productId)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            {/* Modal Content */}
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                {/* Modal Header */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-slate-800">
                        Confirm Deletion
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Are you sure you want to delete this product?
                        This action cannot be undone.
                    </p>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onDelete(productId)}
                        type="button"
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                        Delete
                    </button>

                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
