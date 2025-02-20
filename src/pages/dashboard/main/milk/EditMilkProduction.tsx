import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { milkProductionAPI } from '../../../../features/milk/milkProductionAPI';
import { Toaster, toast } from 'sonner';
import { IoCloseSharp } from 'react-icons/io5';

type MilkProduction = {
    milkProductionId: number;
    livestockId: number;
    productionDate: string;
    quantityLiters: number;
};

type EditMilkProductionProps = {
    milkProduction: MilkProduction;
    onClose: () => void;
    refetch: () => void;
};

const schema = yup.object().shape({
    milkProductionId: yup.number().required(),
    livestockId: yup.number().required(),
    productionDate: yup.string().required('Production Date is required'),
    quantityLiters: yup.number().required('Quantity (Liters) is required').positive('Quantity must be positive'),
});

// const EditMilkProduction = ({ milkProduction, onClose, refetch }: EditMilkProductionProps) => {
//     const [updateMilkProduction] = milkProductionAPI.useUpdateMilkProductionMutation();
//     const { register, handleSubmit, formState: { errors } } = useForm<MilkProduction>({
//         resolver: yupResolver(schema),
//         defaultValues: {
//             ...milkProduction,
//             productionDate: milkProduction.productionDate.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
//         },
//     });

//     const onSubmit: SubmitHandler<MilkProduction> = async (formData) => {
//         const { milkProductionId, livestockId, productionDate, quantityLiters } = formData;
//         const updateData = { milkProductionId, livestockId, productionDate, quantityLiters }

//         // const updateData = {
//         //     ...formData,
//         //     productionDate: new Date(formData.productionDate),
//         // };

//         try {
//             const res = await updateMilkProduction(updateData).unwrap();
//             console.log(res);
//             toast.success('Milk production updated successfully');
//             refetch();
//             onClose();
//         } catch (err) {
//             toast.error('Error updating milk production');
//         }
//     };


const EditMilkProduction = ({ milkProduction, onClose, refetch }: EditMilkProductionProps) => {
    const [updateMilkProduction] = milkProductionAPI.useUpdateMilkProductionMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<MilkProduction>({
        resolver: yupResolver(schema),
        defaultValues: {
            ...milkProduction,
            productionDate: new Date(milkProduction.productionDate).toISOString().split('T')[0], // Convert to YYYY-MM-DD format

            // productionDate: (typeof milkProduction.productionDate === 'string'
            //     ? new Date(milkProduction.productionDate)
            //     : milkProduction.productionDate
            // ).toISOString().split('T')[0], // Convert to YYYY-MM-DD format
        },
    });

    const onSubmit: SubmitHandler<MilkProduction> = async (formData) => {
        const { milkProductionId, livestockId, productionDate, quantityLiters } = formData;
        const updateData = { milkProductionId, livestockId, productionDate, quantityLiters };

        try {
            const res = await updateMilkProduction(updateData).unwrap();
            console.log(res);
            toast.success('Milk production updated successfully');
            refetch();
            onClose();
        } catch (err) {
            toast.error('Error updating milk production');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-slate-200 py-6 px-4 rounded-lg shadow-lg w-full max-w-lg">
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-2xl font-bold">Edit Milk Production</h2>
                    <button onClick={onClose} aria-label="Close" className="text-2xl text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100">
                        <IoCloseSharp />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control flex justify-evenly">
                        <label htmlFor="milkProductionId" className="label">MilkProduction ID</label>
                        <input type="number" id="milkProductionId" className="input input-bordered" {...register("milkProductionId")} disabled />
                        <p className="text-red-500">{errors.milkProductionId?.message}</p>
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
                    <div className="mt-6 flex justify-around">
                        <button onClick={onClose} className="btn bg-red-500 text-white hover:bg-red-600">Cancel</button>
                        <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">Save Changes</button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default EditMilkProduction;
