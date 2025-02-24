import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

type MilkProduction = {
  milkProductionId: number;
  livestockId: number;
  productionDate: string;
  quantityLiters: number;
};

type MilkProductionChartProps = {
  data: MilkProduction[];
};

const MilkProductionChart = ({ data }: MilkProductionChartProps) => {
  // Format data for the chart
  const formattedData = data.map((item) => ({
    date: new Date(item.productionDate).toLocaleDateString(),
    quantity: item.quantityLiters,
  }));

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Milk Production Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="quantity" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      <h2 className="text-2xl font-bold text-center mt-8 mb-4">Milk Production by Date</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MilkProductionChart;
