import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { inventoryAPI } from '../../../../features/Inventory/InventoryAPI';
import { Toaster, toast } from 'sonner';
import { IoCloseSharp } from 'react-icons/io5';
import { useState } from 'react';

type Inventory = {
    inventoryId: number;
    farmerId: number;
    itemName: string;
    quantityAvailable: number;
    unit: string;
    lastRestocked: string;
};

type EditInventoryProps = {
    inventory: Inventory;
    onClose: () => void;
    refetch: () => void;
};

const schema = yup.object().shape({
    inventoryId: yup.number().required(),
    farmerId: yup.number().required('Farmer ID is required'),
    itemName: yup.string().required('Item Name is required'),
    quantityAvailable: yup.number().required('Quantity Available is required').positive('Quantity must be positive'),
    unit: yup.string().required('Unit is required'),
    lastRestocked: yup.string().required('Last Restocked Date is required'),
});

const EditInventory = ({ inventory, onClose, refetch }: EditInventoryProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateInventory] = inventoryAPI.useUpdateInventoryMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<Inventory>({
        resolver: yupResolver(schema),
        defaultValues: {
            ...inventory,
            lastRestocked: new Date(inventory.lastRestocked).toISOString().split('T')[0],
        },
    });

    const onSubmit: SubmitHandler<Inventory> = async (formData) => {
        const { inventoryId, farmerId, itemName, quantityAvailable, unit, lastRestocked } = formData;
        const updateData = { inventoryId, farmerId, itemName, quantityAvailable, unit, lastRestocked };

        try {
            setIsEditing(true);
            await updateInventory(updateData).unwrap();
            toast.success('Inventory updated successfully');
            refetch();
            onClose();
        } catch (err) {
            toast.error('Error updating inventory');
        } finally {
            setIsEditing(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-slate-200 py-6 px-4 rounded-lg shadow-lg w-full max-w-lg">
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-2xl font-bold">Edit Inventory</h2>
                    <button onClick={onClose} aria-label="Close" className="text-2xl text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100">
                        <IoCloseSharp />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control flex justify-evenly">
                        <label htmlFor="inventoryId" className="label">Inventory ID</label>
                        <input type="number" id="inventoryId" className="input input-bordered" {...register("inventoryId")} disabled />
                        <p className="text-red-500">{errors.inventoryId?.message}</p>
                    </div>
                    <div className="form-control flex justify-evenly">
                        <label htmlFor="itemName" className="label">Item Name</label>
                        <input type="text" id="itemName" className="input input-bordered" {...register("itemName")} />
                        <p className="text-red-500">{errors.itemName?.message}</p>
                    </div>
                    <div className="form-control flex justify-evenly">
                        <label htmlFor="quantityAvailable" className="label">Quantity Available</label>
                        <input type="number" id="quantityAvailable" className="input input-bordered" step="0.1" {...register("quantityAvailable")} />
                        <p className="text-red-500">{errors.quantityAvailable?.message}</p>
                    </div>
                    <div className="form-control flex justify-evenly">
                        <label htmlFor="unit" className="label">Unit</label>
                        <select id="unit" className="input input-bordered" {...register("unit")}>
                            <option value="kgs">Kgs</option>
                            <option value="ml">Ml</option>
                            <option value="tonnes">Tonnes</option>
                        </select>
                        <p className="text-red-500">{errors.unit?.message}</p>
                    </div>
                    <div className="form-control flex justify-evenly">
                        <label htmlFor="lastRestocked" className="label">Last Restocked</label>
                        <input type="date" id="lastRestocked" className="input input-bordered" {...register("lastRestocked")} />
                        <p className="text-red-500">{errors.lastRestocked?.message}</p>
                    </div>
                    <div className="mt-6 flex justify-around">
                        <button onClick={onClose} className="btn bg-red-500 text-white hover:bg-red-600">Cancel</button>
                        <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">
                            {isEditing ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    <span className='text-text-light'> Updating...</span>
                                </>
                            ) : (
                                <span>Save Changes</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default EditInventory;
