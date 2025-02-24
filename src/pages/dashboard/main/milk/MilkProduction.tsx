import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { milkProductionAPI } from '../../../../features/milk/milkProductionAPI';
import EditMilkProduction from './EditMilkProduction';
import DeleteMilkProduction from './DeleteMilkProduction';
import CreateMilkProduction from './CreateMilkProduction';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Toaster } from 'sonner';
import Footer from '../../../../components/Footer';
import MilkProductionChart from '../../../../components/visualization/MilkProductionChart';

type MilkProduction = {
  milkProductionId: number;
  livestockId: number;
  productionDate: string;
  quantityLiters: number;
};

const MilkProduction = () => {
  const user = useSelector((state: RootState) => state.user);
  const farmerId = user.user?.farmerId;

  const { data: milkProductionResponse, isLoading, error, refetch } =
    milkProductionAPI.useGetFarmerMilkProductionQuery(farmerId as number, {
      skip: !farmerId,
      refetchOnMountOrArgChange: true,
    });

  const milkProductionData = milkProductionResponse?.$values ?? [];

  const [selectedMilkProduction, setSelectedMilkProduction] = useState<MilkProduction | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const handleEdit = (milkProduction: MilkProduction) => {
    setSelectedMilkProduction({
      ...milkProduction,
      productionDate: new Date(milkProduction.productionDate).toISOString().split('T')[0],
    });
    setIsEditMode(true);
  };

  const handleDelete = (milkProduction: MilkProduction) => {
    setSelectedMilkProduction({
      ...milkProduction,
      productionDate: new Date(milkProduction.productionDate).toISOString().split('T')[0],
    });
    setIsDeleteMode(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading milk production data.</div>;
  }

  return (
    <>
      <Toaster />
      <div className="container mx-auto p-8 min-h-[80vh]">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Milk Production Management</h1>

        {/* Create Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsCreateMode(true)}
            className="btn bg-green-600 text-white hover:bg-green-700 flex items-center"
          >
            <FaPlus className="mr-2" /> Create Milk Production
          </button>
        </div>

        {/* Display Table */}
        {!milkProductionData.length ? (
          <div>No milk production records found.</div>
        ) : (
          <div className="overflow-x-auto mt-8 mb-22">
            <table className="table-auto w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Livestock ID</th>
                  <th className="px-4 py-2">Production Date</th>
                  <th className="px-4 py-2">Quantity (Liters)</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {milkProductionData.map((milkProduction) => (
                  <tr key={milkProduction.livestockId} className="border-b">
                    <td className="px-4 py-2">{milkProduction.milkProductionId}</td>
                    <td className="px-4 py-2">{milkProduction.livestockId}</td>
                    <td className="px-4 py-2">
                      {new Date(milkProduction.productionDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{milkProduction.quantityLiters}</td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => handleEdit(milkProduction)}
                        className="btn bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(milkProduction)}
                        className="btn bg-red-600 text-white hover:bg-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

       <div>
         {/* Display Charts */}
         {milkProductionData.length > 0 && <MilkProductionChart data={milkProductionData} />}
       </div>
      </div>

      {/* Modals for Edit, Delete, Create */}
      {isEditMode && selectedMilkProduction && (
        <EditMilkProduction
          milkProduction={selectedMilkProduction}
          onClose={() => setIsEditMode(false)}
          refetch={refetch}
        />
      )}

      {isDeleteMode && selectedMilkProduction && (
        <DeleteMilkProduction
          milkProduction={selectedMilkProduction}
          onClose={() => setIsDeleteMode(false)}
          refetch={refetch}
        />
      )}

      {isCreateMode && (
        <CreateMilkProduction
          farmerId={farmerId as number}
          onClose={() => setIsCreateMode(false)}
          refetch={refetch}
        />
      )}

      <Footer />
    </>
  );
};

export default MilkProduction;
