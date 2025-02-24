import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { inventoryAPI } from '../../../../features/Inventory/InventoryAPI';
import EditInventory from './EditInventory';
import DeleteInventory from './DeleteInventory';
import CreateInventory from './CreateInventory';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Toaster } from 'sonner';
import Footer from '../../../../components/Footer';
import InventoryChart from './InventoryChart';

type Inventory = {
  inventoryId: number;
  farmerId: number;
  itemName: string;
  quantityAvailable: number;
  unit: string;
  lastRestocked: string;
};

const Inventory = () => {
  const user = useSelector((state: RootState) => state.user);
  const farmerId = user.user?.farmerId;

  const { data: inventoryResponse, isLoading, error, refetch } =
    inventoryAPI.useGetFarmerInventoriesQuery(farmerId as number, {
      skip: !farmerId,
      refetchOnMountOrArgChange: true,
    });

  const inventoryData = inventoryResponse?.$values ?? [];

  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const handleEdit = (inventory: Inventory) => {
    setSelectedInventory({
      ...inventory,
      lastRestocked: new Date(inventory.lastRestocked).toISOString().split('T')[0],
    });
    setIsEditMode(true);
  };

  const handleDelete = (inventory: Inventory) => {
    setSelectedInventory({
      ...inventory,
      lastRestocked: new Date(inventory.lastRestocked).toISOString().split('T')[0],
    });
    setIsDeleteMode(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading inventory data.</div>;
  }

  return (
    <>
      <Toaster />
      <div className="container mx-auto p-8 min-h-[80vh]">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Inventory Management</h1>
        <div className="flex justify-end mb-4">
          <button onClick={() => setIsCreateMode(true)} className="btn bg-green-600 text-white hover:bg-green-700 flex items-center">
            <FaPlus className="mr-2" /> Create Inventory
          </button>
        </div>
        {!inventoryData.length ? (
          <div>No inventory records found.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table-auto w-full bg-white shadow-lg rounded-lg">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Item Name</th>
                    <th className="px-4 py-2">Quantity Available</th>
                    <th className="px-4 py-2">Unit</th>
                    <th className="px-4 py-2">Last Restocked</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((inventory) => (
                    <tr key={inventory.inventoryId} className="border-b">
                      <td className="px-4 py-2">{inventory.inventoryId}</td>
                      <td className="px-4 py-2">{inventory.itemName}</td>
                      <td className="px-4 py-2">{inventory.quantityAvailable}</td>
                      <td className="px-4 py-2">{inventory.unit}</td>
                      <td className="px-4 py-2">{new Date(inventory.lastRestocked).toLocaleDateString()}</td>
                      <td className="px-4 py-2 flex space-x-2">
                        <button onClick={() => handleEdit(inventory)} className="btn bg-blue-600 text-white hover:bg-blue-700">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(inventory)} className="btn bg-red-600 text-white hover:bg-red-700">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <InventoryChart data={inventoryData} />
          </>
        )}
      </div>

      {isEditMode && selectedInventory && (
        <EditInventory
          inventory={selectedInventory}
          onClose={() => setIsEditMode(false)}
          refetch={refetch}
        />
      )}

      {isDeleteMode && selectedInventory && (
        <DeleteInventory
          inventory={selectedInventory}
          onClose={() => setIsDeleteMode(false)}
          refetch={refetch}
        />
      )}

      {isCreateMode && (
        <CreateInventory
          farmerId={farmerId as number}
          onClose={() => setIsCreateMode(false)}
          refetch={refetch}
        />
      )}

      <Footer />
    </>
  );
};

export default Inventory;