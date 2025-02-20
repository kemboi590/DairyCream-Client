import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { livestockAPI } from '../../../../features/livestock/livestockAPI';
import { Toaster, toast } from 'sonner';
import { IoCloseSharp } from 'react-icons/io5';


type Livestock = {
    tagNumber: string;
    breed: string;
    dateOfBirth: string;
    healthStatus: string;
    lastVaccineDate: string;
    farmerId: number;
};

type CreateLivestockProps = {
    farmerId: number;
    onClose: () => void;
    refetch: () => void;
};

const schema = yup.object().shape({
    farmerId: yup.number().required('Farmer ID is required'),
    tagNumber: yup.string().required('Tag Number is required'),
    breed: yup.string().required('Breed is required'),
    dateOfBirth: yup.string().required('Date of Birth is required'),
    healthStatus: yup.string().required('Health Status is required'),
    lastVaccineDate: yup.string().required('Last Vaccine Date is required'),
});

const CreateLivestock = ({ farmerId, onClose, refetch }: CreateLivestockProps) => {
    const [createLivestock] = livestockAPI.useCreateLivestockMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<Livestock>({
        resolver: yupResolver(schema),
        defaultValues: { farmerId } as Livestock,
    });

    const onSubmit: SubmitHandler<Livestock> = async (formData) => {
        console.log("form data", formData);
        try {
            const res = await createLivestock(formData).unwrap();
            console.log('Livestock created:', res);
            toast.success('Livestock created successfully');
            refetch();
            onClose();
        } catch (err) {
            console.error('Error creating livestock', err);
            toast.error('Error creating livestock');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-slate-200 p-6 rounded-lg w-full max-w-xl shadow-xl">

                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-2xl font-bold">Create Livestock</h2>
                    <button onClick={onClose} aria-label="Close" className="text-2xl text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100">
                        <IoCloseSharp />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control flex justify-between">
                        <label htmlFor="tagNumber" className="label">Tag Number</label>
                        <input type="text" id="tagNumber" className="input input-bordered" {...register("tagNumber")} />
                        <p className="text-red-500">{errors.tagNumber?.message}</p>
                    </div>
                    <div className="form-control flex justify-between">
                        <label htmlFor="breed" className="label">Breed</label>
                        <input type="text" id="breed" className="input input-bordered" {...register("breed")} />
                        <p className="text-red-500">{errors.breed?.message}</p>
                    </div>
                    <div className="form-control flex justify-between">
                        <label htmlFor="dateOfBirth" className="label">Date of Birth</label>
                        <input type="date" id="dateOfBirth" className="input input-bordered" {...register("dateOfBirth")} />
                        <p className="text-red-500">{errors.dateOfBirth?.message}</p>
                    </div>
                    <div className="form-control flex justify-between">
                        <label htmlFor="healthStatus" className="label">Health Status</label>
                        <input type="text" id="healthStatus" className="input input-bordered" {...register("healthStatus")} />
                        <p className="text-red-500">{errors.healthStatus?.message}</p>
                    </div>
                    <div className="form-control flex justify-between">
                        <label htmlFor="lastVaccineDate" className="label">Last Vaccine Date</label>
                        <input type="date" id="lastVaccineDate" className="input input-bordered" {...register("lastVaccineDate")} />
                        <p className="text-red-500">{errors.lastVaccineDate?.message}</p>
                    </div>
                    <div className="mt-6 flex justify-around">
                        <button onClick={onClose} className="btn bg-red-500 text-white hover:bg-red-600">Cancel</button>
                        <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">Create Livestock</button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default CreateLivestock;