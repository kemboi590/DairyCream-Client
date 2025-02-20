import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { salesAPI } from '../../../../features/sales/salesAPI';
import { Toaster, toast } from 'sonner';
import { IoCloseSharp } from 'react-icons/io5';

type Sale = {
    farmerId: number;
    product: string;
    quantity: number;
    pricePerUnit: number;
    saleDate: string;
};

type CreateSalesProps = {
    farmerId: number;
    onClose: () => void;
    refetch: () => void;
};

const schema = yup.object().shape({
    farmerId: yup.number().required('Farmer ID is required'),
    product: yup.string().required('Product is required'),
    quantity: yup.number().required('Quantity is required').positive('Quantity must be positive'),
    pricePerUnit: yup.number().required('Price Per Unit is required').positive('Price must be positive'),
    saleDate: yup.string().required('Sale Date is required'),
});

const CreateSales = ({ farmerId, onClose, refetch }: CreateSalesProps) => {
    const [createSale] = salesAPI.useCreateSaleMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<Sale>({
        resolver: yupResolver(schema),
        defaultValues: { farmerId } as Sale,
    });

    const onSubmit: SubmitHandler<Sale> = async (formData) => {
        try {
            await createSale(formData).unwrap();
            toast.success('Sale record created successfully');
            refetch();
            onClose();
        } catch (err) {
            toast.error('Error creating sale record');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-slate-200 p-6 rounded-lg w-full max-w-xl shadow-xl">
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-2xl font-bold">Create Sale</h2>
                    <button onClick={onClose} aria-label="Close" className="text-2xl text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100">
                        <IoCloseSharp />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <div className="form-control flex justify-evenly">
                        <label htmlFor="product" className="label">Product</label>
                        <input type="text" id="product" className="input input-bordered" {...register("product")} />
                        <p className="text-red-500">{errors.product?.message}</p>
                    </div>
                    <div className="form-control flex justify-evenly">
                        <label htmlFor="quantity" className="label">Quantity</label>
                        <input type="number" id="quantity" className="input input-bordered" step="0.1" {...register("quantity")} />
                        <p className="text-red-500">{errors.quantity?.message}</p>
                    </div>
                    <div className="form-control flex justify-evenly">
                        <label htmlFor="pricePerUnit" className="label">Price Per Unit</label>
                        <input type="number" id="pricePerUnit" className="input input-bordered" step="0.01" {...register("pricePerUnit")} />
                        <p className="text-red-500">{errors.pricePerUnit?.message}</p>
                    </div>
                    <div className="form-control flex justify-evenly">
                        <label htmlFor="saleDate" className="label">Sale Date</label>
                        <input type="date" id="saleDate" className="input input-bordered" {...register("saleDate")} />
                        <p className="text-red-500">{errors.saleDate?.message}</p>
                    </div>
                    <div className="mt-6 flex justify-evenly">
                        <button onClick={onClose} className="btn bg-red-500 text-white hover:bg-red-600">Cancel</button>
                        <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">Create Sale</button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div >
    );
};

export default CreateSales;