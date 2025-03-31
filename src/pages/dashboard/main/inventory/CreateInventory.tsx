import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { inventoryAPI } from '../../../../features/newInventory/inventoryAPI';
import { Toaster, toast } from 'sonner';
import { IoCloseSharp } from 'react-icons/io5';

type Inventory = {
  farmerId: number;
  itemName: string;
  quantityAvailable: number;
  unit: string;
  lastRestocked: string;
};

type CreateInventoryProps = {
  farmerId: number;
  onClose: () => void;
  refetch: () => void;
};

const schema = yup.object().shape({
  farmerId: yup.number().required('Farmer ID is required'),
  itemName: yup.string().required('Item Name is required'),
  quantityAvailable: yup.number().required('Quantity Available is required').positive('Quantity must be positive'),
  unit: yup.string().required('Unit is required'),
  lastRestocked: yup.string().required('Last Restocked Date is required'),
});

const CreateInventory = ({ farmerId, onClose, refetch }: CreateInventoryProps) => {
  const [createInventory] = inventoryAPI.useCreateInventoryMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<Inventory>({
    resolver: yupResolver(schema),
    defaultValues: { farmerId } as Inventory,
  });

  const onSubmit: SubmitHandler<Inventory> = async (formData) => {
    try {
      await createInventory(formData).unwrap();
      toast.success('Inventory record created successfully');
      refetch();
      onClose();
    } catch (err) {
      toast.error('Error creating inventory record');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-slate-200 p-6 rounded-lg w-full max-w-xl shadow-xl">
        <div className='flex justify-between items-center mb-4'>
          <h2 className="text-2xl font-bold">Create Inventory</h2>
          <button onClick={onClose} aria-label="Close" className="text-2xl text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-100">
            <IoCloseSharp />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
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
            <input type="text" id="unit" className="input input-bordered" {...register("unit")} />
            <p className="text-red-500">{errors.unit?.message}</p>
          </div>
          <div className="form-control flex justify-evenly">
            <label htmlFor="lastRestocked" className="label">Last Restocked</label>
            <input type="date" id="lastRestocked" className="input input-bordered" {...register("lastRestocked")} />
            <p className="text-red-500">{errors.lastRestocked?.message}</p>
          </div>
          <div className="mt-6 flex justify-evenly">
            <button onClick={onClose} className="btn bg-red-500 text-white hover:bg-red-600">Cancel</button>
            <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">Create Inventory</button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default CreateInventory;