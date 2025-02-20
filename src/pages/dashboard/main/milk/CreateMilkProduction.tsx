import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { milkProductionAPI } from '../../../../features/milk/milkProductionAPI';
import { Toaster, toast } from 'sonner';
import { IoCloseSharp } from 'react-icons/io5';
import { useState } from 'react';


type MilkProduction = {
    livestockId: number;
    productionDate: string;
    quantityLiters: number;
    farmerId: number;
};

type CreateMilkProductionProps = {
    farmerId: number;
    onClose: () => void;
    refetch: () => void;
};

const schema = yup.object().shape({
    farmerId: yup.number().required('Farmer ID is required'),
    livestockId: yup.number().required('Livestock ID is required'),
    productionDate: yup.string().required('Production Date is required'),
    quantityLiters: yup.number().required('Quantity (Liters) is required').positive('Quantity must be positive'),
});

const CreateMilkProduction = ({ farmerId, onClose, refetch }: CreateMilkProductionProps) => {
    const [isCreating, setIsCreating] = useState(false)
    const [createMilkProduction] = milkProductionAPI.useCreateMilkProductionMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<MilkProduction>({
        resolver: yupResolver(schema),
        defaultValues: { farmerId } as MilkProduction,
    });

    const onSubmit: SubmitHandler<MilkProduction> = async (formData) => {
        try {
            setIsCreating(true);
            await createMilkProduction(formData).unwrap();
            toast.success('Milk production record created successfully');
            refetch();
            onClose();
        } catch (err) {
            toast.error('Error creating milk production record');
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-slate-200 p-6 rounded-lg w-full max-w-xl shadow-xl">
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-2xl font-bold">Create Milk Production</h2>
                    <button onClick={onClose} aria-label="Close" className="text-2xl text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100">
                        <IoCloseSharp />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <div className="form-control flex justify-evenly">
                        <label htmlFor="livestockId" className="label">Livestock ID</label>
                        <input type="number" id="livestockId" className="input input-bordered" {...register("livestockId")} />
                        <p className="text-red-500">{errors.livestockId?.message}</p>
                    </div>
                    <div className="form-control flex justify-evenly">
                        <label htmlFor="productionDate" className="label">Production Date</label>
                        <input type="date" id="productionDate" className="input input-bordered" {...register("productionDate")} />
                        <p className="text-red-500">{errors.productionDate?.message}</p>
                    </div>
                    <div className="form-control flex justify-evenly">
                        <label htmlFor="quantityLiters" className="label">Quantity (Liters)</label>
                        <input type="number" id="quantityLiters" className="input input-bordered" step="0.1" {...register("quantityLiters")} />
                        <p className="text-red-500">{errors.quantityLiters?.message}</p>
                    </div>
                    <div className="mt-6 flex justify-evenly">
                        <button onClick={onClose} className="btn bg-red-500 text-white hover:bg-red-600">Cancel</button>
                        <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">
                            {isCreating ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    <span className='text-text-light'>Creating...</span>
                                </>
                            ) : (
                                <span>Create Milk Production</span>
                            )}

                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default CreateMilkProduction;
