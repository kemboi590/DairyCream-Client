import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type Inventory = {
    itemName: string;
    quantityAvailable: number;
    unit: string;
};

type InventoryChartProps = {
    data: Inventory[];
};

const InventoryChart = ({ data }: InventoryChartProps) => {
    // Aggregate data for item quantities
    const itemQuantities = data.reduce((acc: Record<string, number>, item: Inventory) => {
        acc[item.itemName] = (acc[item.itemName] || 0) + item.quantityAvailable;
        return acc;
    }, {});

    const itemQuantitiesData = Object.keys(itemQuantities).map((itemName) => ({
        itemName,
        quantity: itemQuantities[itemName],
    }));

    // Aggregate data for unit distribution
    const unitDistribution = data.reduce((acc: Record<string, number>, item: Inventory) => {
        acc[item.unit] = (acc[item.unit] || 0) + item.quantityAvailable;
        return acc;
    }, {});

    const unitDistributionData = Object.keys(unitDistribution).map((unit) => ({
        name: unit,
        value: unitDistribution[unit],
    }));

    const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
            {/* Bar Chart for Item Quantities */}
            <div className="w-full lg:w-1/2 bg-white p-4 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-4">Item Quantities</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={itemQuantitiesData}>
                        <XAxis dataKey="itemName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="quantity" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Pie Chart for Unit Distribution */}
            <div className="w-full lg:w-1/2 bg-white p-4 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-4">Unit Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={unitDistributionData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {unitDistributionData.map((_, index) => (
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

export default InventoryChart;
