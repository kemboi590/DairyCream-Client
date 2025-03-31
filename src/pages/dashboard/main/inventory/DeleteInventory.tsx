import { inventoryAPI } from '../../../../features/newInventory/inventoryAPI';
import { Toaster, toast } from 'sonner';
import { useState } from 'react';

type Inventory = {
    inventoryId: number;
    farmerId: number;
    itemName: string;
    quantityAvailable: number;
    unit: string;
    lastRestocked: string;
};

type DeleteInventoryProps = {
    inventory: Inventory;
    onClose: () => void;
    refetch: () => void;
};

const DeleteInventory = ({ inventory, onClose, refetch }: DeleteInventoryProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteInventory] = inventoryAPI.useDeleteInventoryMutation();

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteInventory(inventory.inventoryId).unwrap();
            toast.success('Inventory deleted successfully');
            refetch();
            onClose();
        } catch (err) {
            toast.error('Error deleting inventory');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <div className="bg-slate-200 p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Delete Inventory</h2>
                <p>Are you sure you want to delete the inventory record for item {inventory.itemName}?</p>
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

export default DeleteInventory;
