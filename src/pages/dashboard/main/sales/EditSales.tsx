import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { salesAPI } from '../../../../features/sales/salesAPI';
import { Toaster, toast } from 'sonner';
import { IoCloseSharp } from 'react-icons/io5';
import { useState } from 'react';

type Sale = {
    saleId: number;
    farmerId: number;
    product: string;
    quantity: number;
    pricePerUnit: number;
    saleDate: string;
};

type EditSalesProps = {
    sale: Sale;
    onClose: () => void;
    refetch: () => void;
};

const schema = yup.object().shape({
    farmerId: yup.number().required('Farmer ID is required'),
    saleId: yup.number().required(),
    product: yup.string().required('Product is required'),
    quantity: yup.number().required('Quantity is required').positive('Quantity must be positive'),
    pricePerUnit: yup.number().required('Price Per Unit is required').positive('Price must be positive'),
    saleDate: yup.string().required('Sale Date is required'),
});

const EditSales = ({ sale, onClose, refetch }: EditSalesProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateSale] = salesAPI.useUpdateSaleMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<Sale>({
        resolver: yupResolver(schema),
        defaultValues: {
            ...sale,
            saleDate: new Date(sale.saleDate).toISOString().split('T')[0],
        },
    });

    const onSubmit: SubmitHandler<Sale> = async (formData) => {
        console.log("form data", formData);
        const { farmerId, saleId, product, quantity, pricePerUnit, saleDate } = formData;
        const updateData = { farmerId, saleId, product, quantity, pricePerUnit, saleDate };

        try {
            setIsEditing(true);
            await updateSale(updateData).unwrap();
            toast.success('Sale updated successfully');
            refetch();
            onClose();
        } catch (err) {
            toast.error('Error updating sale');
        } finally {
            setIsEditing(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-slate-200 py-6 px-4 rounded-lg shadow-lg w-full max-w-lg">
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-2xl font-bold">Edit Sale</h2>
                    <button onClick={onClose} aria-label="Close" className="text-2xl text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100">
                        <IoCloseSharp />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control flex justify-evenly">
                        <label htmlFor="saleId" className="label">Sale ID</label>
                        <input type="number" id="saleId" className="input input-bordered" {...register("saleId")} disabled />
                        <p className="text-red-500">{errors.saleId?.message}</p>
                    </div>
                    <div className="form-control flex justify-evenly">
                        <label htmlFor="product" className="label">Product</label>
                        <input type="text" id="product" className="input input-bordered" {...register("product")} />
                        <p className="text-red-500">{errors.product?.message}</p>
                    </div>
                    <div className="form-control flex justify-evenly">
                        <label htmlFor="quantity" className="label">Quantity in Kg</label>
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

export default EditSales;
