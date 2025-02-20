import { salesAPI } from '../../../../features/sales/salesAPI';
import { Toaster, toast } from 'sonner';
import { useState } from 'react';

type Sale = {
    saleId: number;
    farmerId: number;
    product: string;
    quantity: number;
    pricePerUnit: number;
    saleDate: string;
};

type DeleteSalesProps = {
    sale: Sale;
    onClose: () => void;
    refetch: () => void;
};

const DeleteSales = ({ sale, onClose, refetch }: DeleteSalesProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteSale] = salesAPI.useDeleteSaleMutation();

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteSale(sale.saleId).unwrap();
            toast.success('Sale deleted successfully');
            refetch();
            onClose();
        } catch (err) {
            toast.error('Error deleting sale');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <div className="bg-slate-200 p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Delete Sale</h2>
                <p>Are you sure you want to delete the sale record for product {sale.product}?</p>
                <div className="mt-6 flex justify-around">
                    <button onClick={onClose} className="btn bg-gray-500 text-white hover:bg-gray-600">Cancel</button>
                    <button onClick={handleDelete} className="btn bg-red-600 text-white hover:bg-red-700">
                        {isDeleting ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                <span className='text-text-light'>Deleting...</span>
                            </>
                        ) : (
                            <span>Delete</span>
                        )}
                    </button>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default DeleteSales;
