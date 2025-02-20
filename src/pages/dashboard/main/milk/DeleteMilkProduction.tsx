import { milkProductionAPI } from '../../../../features/milk/milkProductionAPI';
import { Toaster, toast } from 'sonner';

type MilkProduction = {
    milkProductionId: number;
    livestockId: number;
    productionDate: string;
    quantityLiters: number;
};

type DeleteMilkProductionProps = {
    milkProduction: MilkProduction;
    onClose: () => void;
    refetch: () => void;
};

const DeleteMilkProduction = ({ milkProduction, onClose, refetch }: DeleteMilkProductionProps) => {
    const [deleteMilkProduction] = milkProductionAPI.useDeleteMilkProductionMutation();

    const handleDelete = async () => {
        try {
            await deleteMilkProduction(milkProduction.milkProductionId).unwrap();
            toast.success('Milk production deleted successfully');
            refetch();
            onClose();
        } catch (err) {
            toast.error('Error deleting milk production');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <div className="bg-slate-200 p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Delete Milk Production</h2>
                <p>Are you sure you want to delete the milk production record for livestock ID {milkProduction.livestockId}?</p>
                <div className="mt-6 flex justify-around">
                    <button onClick={onClose} className="btn bg-gray-500 text-white hover:bg-gray-600">Cancel</button>
                    <button onClick={handleDelete} className="btn bg-red-600 text-white hover:bg-red-700">Delete</button>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default DeleteMilkProduction;
