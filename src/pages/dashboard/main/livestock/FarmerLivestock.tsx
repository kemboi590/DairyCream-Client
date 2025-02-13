import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { livestockAPI } from '../../../../features/livestock/livestockAPI';
import EditLivestock from './EditLivestock';
import DeleteLivestock from './DeleteLivestock';
import CreateLivestock from './CreateLivestock';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Toaster } from 'sonner';
import Footer from '../../../../components/Footer';

type Livestock = {
    farmerId: number;
    livestockId: number;
    tagNumber: string;
    breed: string;
    dateOfBirth: Date;
    healthStatus: string;
    lastVaccineDate: Date;
};

const FarmerLivestock = () => {
    const user = useSelector((state: RootState) => state.user);
    const farmerId = user.user?.farmerId;

    const { data: livestockResponse, isLoading, error, refetch } =
        livestockAPI.useGetFarmerLivestockQuery(farmerId as number, {
            skip: !farmerId,
            refetchOnMountOrArgChange: true,
        });

    const livestockData = (livestockResponse as unknown as { $values: Livestock[] })?.$values ?? [];// if livestockResponse is not null, get the $values property, else return an empty array

    const [selectedLivestock, setSelectedLivestock] = useState<Livestock | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [isCreateMode, setIsCreateMode] = useState(false);

    const handleEdit = (livestock: Livestock) => {
        setSelectedLivestock({
            ...livestock,
            dateOfBirth: new Date(livestock.dateOfBirth),
            lastVaccineDate: new Date(livestock.lastVaccineDate),
            farmerId: farmerId as number,
        });
        setIsEditMode(true);
    };

    const handleDelete = (livestock: Livestock) => {
        setSelectedLivestock({
            ...livestock,
            dateOfBirth: new Date(livestock.dateOfBirth),
            lastVaccineDate: new Date(livestock.lastVaccineDate),
            farmerId: farmerId as number,
        });
        setIsDeleteMode(true);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading livestock data.</div>;
    }

    if (!livestockData.length) {
        return <div>No livestock found.</div>;
    }

    return (
        <>
            <Toaster />
            <div className="container mx-auto p-8">
                <h1 className="text-4xl font-bold text-blue-600 mb-8">Farmer Livestock Management</h1>
                <div className="flex justify-end mb-4">
                    <button onClick={() => setIsCreateMode(true)} className="btn bg-green-600 text-white hover:bg-green-700 flex items-center">
                        <FaPlus className="mr-2" /> Create Livestock
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-white shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="px-4 py-2">Tag Number</th>
                                <th className="px-4 py-2">Breed</th>
                                <th className="px-4 py-2">Date of Birth</th>
                                <th className="px-4 py-2">Health Status</th>
                                <th className="px-4 py-2">Last Vaccine Date</th>
                                <th className="px-4 py-2 flex justify-between items-center">
                                    <span>Actions</span>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {livestockData.map((livestock) => (
                                <tr key={livestock.livestockId} className="border-b">
                                    <td className="px-4 py-2">{livestock.tagNumber}</td>
                                    <td className="px-4 py-2">{livestock.breed}</td>
                                    <td className="px-4 py-2">{new Date(livestock.dateOfBirth).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{livestock.healthStatus}</td>
                                    <td className="px-4 py-2">{new Date(livestock.lastVaccineDate).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 flex space-x-2">
                                        <button onClick={() => handleEdit(livestock)} className="btn bg-blue-600 text-white hover:bg-blue-700">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(livestock)} className="btn bg-red-600 text-white hover:bg-red-700">
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

            {isCreateMode && (
                <CreateLivestock
                    farmerId={farmerId as number}
                    onClose={() => setIsCreateMode(false)}
                    refetch={refetch}
                />
            )}

            <Footer />
        </>
    );
};

export default FarmerLivestock;