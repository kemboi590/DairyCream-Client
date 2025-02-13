import { useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../app/store";
import { livestockAPI } from "../../../../features/livestock/livestockAPI";
import EditLivestock from "./EditLivestock";
import DeleteLivestock from "./DeleteLivestock";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Toaster } from "sonner";
import Footer from "../../../../components/Footer";

// Define the response type based on .NET serialization
type LivestockResponse = {
  $id: string;
  $values: Livestock[];
};

type Livestock = {
  livestockId: number;
  tagNumber: string;
  breed: string;
  dateOfBirth: Date;
  healthStatus: string;
  lastVaccineDate: Date;
  farmerId: number;
};

const Livestock = () => {
  // Fetch data from API
  const { data: livestockResponse, isLoading, error, refetch } =
    livestockAPI.useGetLivestockQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  console.log("Livestock API Response:", livestockResponse); // Debugging log

  // Ensure we extract the $values property correctly
  const livestockData = (livestockResponse as unknown as LivestockResponse)?.$values ?? [];

  console.log("Extracted Livestock Data:", livestockData); // Debugging log

  const [selectedLivestock, setSelectedLivestock] = useState<Livestock | null>(
    null
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const handleEdit = (livestock: Livestock) => {
    setSelectedLivestock(livestock);
    setIsEditMode(true);
  };

  const handleDelete = (livestock: Livestock) => {
    setSelectedLivestock(livestock);
    setIsDeleteMode(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading livestock data.</div>;
  }

  return (
    <>
      <Toaster />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Livestock Management
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2">Tag Number</th>
                <th className="px-4 py-2">Breed</th>
                <th className="px-4 py-2">Date of Birth</th>
                <th className="px-4 py-2">Health Status</th>
                <th className="px-4 py-2">Last Vaccine Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {livestockData.map((livestock) => (
                <tr key={livestock.livestockId} className="border-b">
                  <td className="px-4 py-2">{livestock.tagNumber}</td>
                  <td className="px-4 py-2">{livestock.breed}</td>
                  <td className="px-4 py-2">
                    {new Date(livestock.dateOfBirth).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{livestock.healthStatus}</td>
                  <td className="px-4 py-2">
                    {new Date(livestock.lastVaccineDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(livestock)}
                      className="btn bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(livestock)}
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
      </div>

      {isEditMode && selectedLivestock && (
        <EditLivestock
          livestock={selectedLivestock}
          onClose={() => setIsEditMode(false)}
          refetch={refetch}
        />
      )}

      {isDeleteMode && selectedLivestock && (
        <DeleteLivestock
          livestock={selectedLivestock}
          onClose={() => setIsDeleteMode(false)}
          refetch={refetch}
        />
      )}

      <Footer />
    </>
  );
};

export default Livestock;
