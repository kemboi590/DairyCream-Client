import { livestockAPI } from '../../../features/livestock/livestockAPI';
import { Toaster, toast } from 'sonner';

type Livestock = {
    livestockId: number;
    tagNumber: string;
    breed: string;
    dateOfBirth: Date;
    healthStatus: string;
    lastVaccineDate: Date;
};

type DeleteLivestockProps = {
    livestock: Livestock;
    onClose: () => void;
    refetch: () => void;
};

const DeleteLivestock = ({ livestock, onClose, refetch }: DeleteLivestockProps) => {
    const [deleteLivestock] = livestockAPI.useDeleteLivestockMutation();

    const handleDelete = async () => {
        try {
            await deleteLivestock(livestock.livestockId).unwrap();
            toast.success('Livestock deleted successfully');
            refetch();
            onClose();
        } catch (err) {
            console.error('Error deleting livestock', err);
            toast.error('Error deleting livestock');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Delete Livestock</h2>
                <p>Are you sure you want to delete the livestock with tag number {livestock.tagNumber}?</p>
                <div className="mt-6 flex justify-around">
                    <button onClick={onClose} className="btn bg-gray-500 text-white hover:bg-gray-600">Cancel</button>
                    <button onClick={handleDelete} className="btn bg-red-600 text-white hover:bg-red-700">Delete</button>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default DeleteLivestock;