import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { salesAPI } from '../../../../features/sales/salesAPI';
import EditSales from './EditSales';
import DeleteSales from './DeleteSales';
import CreateSales from './CreateSales';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Toaster } from 'sonner';
import Footer from '../../../../components/Footer';
import SalesChart from './SalesChart';

type Sale = {
    saleId: number;
    farmerId: number;
    product: string;
    quantity: number;
    pricePerUnit: number;
    saleDate: string;
};

const Sales = () => {
    const user = useSelector((state: RootState) => state.user);
    const farmerId = user.user?.farmerId;

    const { data: salesResponse, isLoading, error, refetch } =
        salesAPI.useGetFarmerSalesQuery(farmerId as number, {
            skip: !farmerId,
            refetchOnMountOrArgChange: true,
        });

    const salesData = salesResponse?.$values ?? [];

    const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [isCreateMode, setIsCreateMode] = useState(false);

    const handleEdit = (sale: Sale) => {
        setSelectedSale({
            ...sale,
            saleDate: new Date(sale.saleDate).toISOString().split('T')[0],
        });
        setIsEditMode(true);
    };

    const handleDelete = (sale: Sale) => {
        setSelectedSale({
            ...sale,
            saleDate: new Date(sale.saleDate).toISOString().split('T')[0],
        });
        setIsDeleteMode(true);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading sales data.</div>;
    }

    return (
        <>
            <Toaster />
            <div className="container mx-auto p-8 min-h-[80vh]">
                <h1 className="text-4xl font-bold text-blue-600 mb-8">Sales Management</h1>
                <div className="flex justify-end mb-4">
                    <button onClick={() => setIsCreateMode(true)} className="btn bg-green-600 text-white hover:bg-green-700 flex items-center">
                        <FaPlus className="mr-2" /> Create Sale
                    </button>
                </div>
                {!salesData.length ? (
                    <div>No sales records found.</div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full bg-white shadow-lg rounded-lg">
                                <thead>
                                    <tr className="bg-blue-600 text-white">
                                        <th className="px-4 py-2">ID</th>
                                        <th className="px-4 py-2">Product</th>
                                        <th className="px-4 py-2">Quantity</th>
                                        <th className="px-4 py-2">Price Per Unit</th>
                                        <th className="px-4 py-2">Sale Date</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salesData.map((sale) => (
                                        <tr key={sale.saleId} className="border-b">
                                            <td className="px-4 py-2">{sale.saleId}</td>
                                            <td className="px-4 py-2">{sale.product}</td>
                                            <td className="px-4 py-2">{sale.quantity}</td>
                                            <td className="px-4 py-2">{sale.pricePerUnit}</td>
                                            <td className="px-4 py-2">{new Date(sale.saleDate).toLocaleDateString()}</td>
                                            <td className="px-4 py-2 flex space-x-2">
                                                <button onClick={() => handleEdit(sale)} className="btn bg-blue-600 text-white hover:bg-blue-700">
                                                    <FaEdit />
                                                </button>
                                                <button onClick={() => handleDelete(sale)} className="btn bg-red-600 text-white hover:bg-red-700">
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <SalesChart data={salesData} />
                    </>
                )}
            </div>

            {isEditMode && selectedSale && (
                <EditSales
                    sale={selectedSale}
                    onClose={() => setIsEditMode(false)}
                    refetch={refetch}
                />
            )}

            {isDeleteMode && selectedSale && (
                <DeleteSales
                    sale={selectedSale}
                    onClose={() => setIsDeleteMode(false)}
                    refetch={refetch}
                />
            )}

            {isCreateMode && (
                <CreateSales
                    farmerId={farmerId as number}
                    onClose={() => setIsCreateMode(false)}
                    refetch={refetch}
                />
            )}

            <Footer />
        </>
    );
};

export default Sales;
