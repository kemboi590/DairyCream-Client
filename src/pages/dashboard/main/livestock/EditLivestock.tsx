import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { livestockAPI } from '../../../../features/livestock/livestockAPI';
import { Toaster, toast } from 'sonner';
import { IoCloseSharp } from 'react-icons/io5';


type Livestock = {
    livestockId: number;
    tagNumber: string;
    breed: string;
    dateOfBirth: string;
    healthStatus: string;
    lastVaccineDate: string;
    farmerId: number;
};

type EditLivestockProps = {
    livestock: Livestock;
    onClose: () => void;
    refetch: () => void;
};

const schema = yup.object().shape({
    livestockId: yup.number().required(),
    tagNumber: yup.string().required('Tag Number is required'),
    breed: yup.string().required('Breed is required'),
    dateOfBirth: yup.string().required('Date of Birth is required'),
    healthStatus: yup.string().required('Health Status is required'),
    lastVaccineDate: yup.string().required('Last Vaccine Date is required'),
    farmerId: yup.number().required('Farmer ID is required'),
});

const EditLivestock = ({ livestock, onClose, refetch }: EditLivestockProps) => {
    const [updateLivestock] = livestockAPI.useUpdateLivestockMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<Livestock>({
        resolver: yupResolver(schema),
        defaultValues: {
            ...livestock,
            dateOfBirth: new Date(livestock.dateOfBirth).toISOString().split('T')[0],
            lastVaccineDate: new Date(livestock.lastVaccineDate).toISOString().split('T')[0],
        }
    });

    const onSubmit: SubmitHandler<Livestock> = async (formData) => {
        const { livestockId, tagNumber, breed, dateOfBirth, healthStatus, lastVaccineDate, farmerId } = formData;
        const updateData = { livestockId, tagNumber, breed, dateOfBirth, healthStatus, lastVaccineDate, farmerId };
        try {
            await updateLivestock(updateData).unwrap();
            toast.success('Livestock updated successfully');
            refetch();
            onClose();
        } catch (err) {
            // console.error('Error updating livestock', err);
            toast.error('Error updating livestock');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-slate-200 py-6 px-4 rounded-lg shadow-lg w-full max-w-lg">
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-2xl font-bold">Edit Livestock</h2>
                    <button onClick={onClose} aria-label="Close" className="text-2xl text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100">
                        <IoCloseSharp />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control">
                        <label htmlFor="tagNumber" className="label">Tag Number</label>
                        <input type="text" id="tagNumber" className="input input-bordered" {...register("tagNumber")} disabled />
                        <p className="text-red-500">{errors.tagNumber?.message}</p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="breed" className="label">Breed</label>
                        <input type="text" id="breed" className="input input-bordered" {...register("breed")} />
                        <p className="text-red-500">{errors.breed?.message}</p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="dateOfBirth" className="label">Date of Birth</label>
                        <input type="date" id="dateOfBirth" className="input input-bordered" {...register("dateOfBirth")} />
                        <p className="text-red-500">{errors.dateOfBirth?.message}</p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="healthStatus" className="label">Health Status</label>
                        <input type="text" id="healthStatus" className="input input-bordered" {...register("healthStatus")} />
                        <p className="text-red-500">{errors.healthStatus?.message}</p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="lastVaccineDate" className="label">Last Vaccine Date</label>
                        <input type="date" id="lastVaccineDate" className="input input-bordered" {...register("lastVaccineDate")} />
                        <p className="text-red-500">{errors.lastVaccineDate?.message}</p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="farmerId" className="label">Farmer ID</label>
                        <input type="number" id="farmerId" className="input input-bordered " {...register("farmerId")} disabled />
                        <p className="text-red-500">{errors.farmerId?.message}</p>
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

export default EditLivestock;