import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

type Livestock = {
    breed: string;
    healthStatus: string;
};

type LivestockChartProps = {
    data: Livestock[];
};

const LivestockChart = ({ data }: LivestockChartProps) => {
    // Aggregate data for breed count
    const breedCount = data.reduce((acc: Record<string, number>, livestock: Livestock) => {
        acc[livestock.breed] = (acc[livestock.breed] || 0) + 1;
        return acc;
    }, {});

    const breedChartData = Object.keys(breedCount).map((breed) => ({
        breed,
        count: breedCount[breed],
    }));

    // Aggregate data for health status distribution
    const healthCount = data.reduce((acc: Record<string, number>, livestock: Livestock) => {
        acc[livestock.healthStatus] = (acc[livestock.healthStatus] || 0) + 1;
        return acc;
    }, {});

    const healthChartData = Object.keys(healthCount).map((status) => ({
        name: status,
        value: healthCount[status],
    }));

    const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
            {/* Bar Chart for Livestock Breeds */}
            <div className="w-full lg:w-1/2 bg-white p-4 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-4">Livestock Count by Breed</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={breedChartData}>
                        <XAxis dataKey="breed" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Pie Chart for Health Status Distribution */}
            <div className="w-full lg:w-1/2 bg-white p-4 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-4">Livestock Health Status</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={healthChartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {healthChartData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LivestockChart;
