import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { milkProductionAPI } from '../../../../features/milk/milkProductionAPI';
import { Toaster, toast } from 'sonner';

type MilkProduction = {
    livestockId: number;
    productionDate: Date;
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
    productionDate: yup.date().required('Production Date is required'),
    quantityLiters: yup.number().required('Quantity (Liters) is required').positive('Quantity must be positive'),
});

const CreateMilkProduction = ({ farmerId, onClose, refetch }: CreateMilkProductionProps) => {
    const [createMilkProduction] = milkProductionAPI.useCreateMilkProductionMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<MilkProduction>({
        resolver: yupResolver(schema),
        defaultValues: { farmerId } as MilkProduction,
    });

    const onSubmit: SubmitHandler<MilkProduction> = async (formData) => {
        try {
            const res = await createMilkProduction(formData).unwrap();
            toast.success('Milk production record created successfully');
            refetch();
            onClose();
        } catch (err) {
            toast.error('Error creating milk production record');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-slate-200 p-6 rounded-lg w-full max-w-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Create Milk Production</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control">
                        <label htmlFor="livestockId" className="label">Livestock ID</label>
                        <input type="number" id="livestockId" className="input input-bordered" {...register("livestockId")} />
                        <p className="text-red-500">{errors.livestockId?.message}</p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="productionDate" className="label">Production Date</label>
                        <input type="date" id="productionDate" className="input input-bordered" {...register("productionDate")} />
                        <p className="text-red-500">{errors.productionDate?.message}</p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="quantityLiters" className="label">Quantity (Liters)</label>
                        <input type="number" id="quantityLiters" className="input input-bordered" {...register("quantityLiters")} />
                        <p className="text-red-500">{errors.quantityLiters?.message}</p>
                    </div>
                    <div className="mt-6 flex justify-around">
                        <button onClick={onClose} className="btn bg-red-500 text-white hover:bg-red-600">Cancel</button>
                        <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">Create Milk Production</button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default CreateMilkProduction;
