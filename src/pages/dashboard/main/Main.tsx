import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { livestockAPI } from '../../../features/livestock/livestockAPI';
import { salesAPI } from '../../../features/sales/salesAPI';
import { milkProductionAPI } from '../../../features/milk/milkProductionAPI';
import { inventoryAPI } from '../../../features/newInventory/inventoryAPI';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Footer from '../../../components/Footer';

const Main = () => {
  const user = useSelector((state: RootState) => state.user);
  const farmerId = user.user?.farmerId;

  const { data: livestockResponse } = livestockAPI.useGetFarmerLivestockQuery(farmerId as number, {
    skip: !farmerId,
    refetchOnMountOrArgChange: true,
  });

  const { data: salesResponse } = salesAPI.useGetFarmerSalesQuery(farmerId as number, {
    skip: !farmerId,
    refetchOnMountOrArgChange: true,
  });

  const { data: milkProductionResponse } = milkProductionAPI.useGetFarmerMilkProductionQuery(farmerId as number, {
    skip: !farmerId,
    refetchOnMountOrArgChange: true,
  });

  const { data: inventoryResponse } = inventoryAPI.useGetFarmerInventoriesQuery(farmerId as number, {
    skip: !farmerId,
    refetchOnMountOrArgChange: true,
  });

  const livestockData = livestockResponse?.values ?? [];
  const salesData = salesResponse?.$values ?? [];
  const milkProductionData = milkProductionResponse?.$values ?? [];
  const inventoryData = inventoryResponse?.$values ?? [];

  return (
    <>
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card bg-blue-600 text-white shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Livestock</h2>
              <p className="text-4xl">{livestockData.length}</p>
            </div>
          </div>
          <div className="card bg-green-600 text-white shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Sales</h2>
              <p className="text-4xl">{salesData.length}</p>
            </div>
          </div>
          <div className="card bg-yellow-600 text-white shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Milk Production</h2>
              <p className="text-4xl">{milkProductionData.length}</p>
            </div>
          </div>
          <div className="card bg-red-600 text-white shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Inventory</h2>
              <p className="text-4xl">{inventoryData.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#8884d8" />
                <Bar dataKey="pricePerUnit" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Milk Production Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={milkProductionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="productionDate" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantityLiters" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;