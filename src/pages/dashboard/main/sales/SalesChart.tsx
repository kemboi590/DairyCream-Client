import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type Sale = {
    product: string;
    quantity: number;
    pricePerUnit: number;
};

type SalesChartProps = {
    data: Sale[];
};

const SalesChart = ({ data }: SalesChartProps) => {
    // Aggregate data for product sales
    const productSales = data.reduce((acc: Record<string, number>, sale: Sale) => {
        acc[sale.product] = (acc[sale.product] || 0) + sale.quantity;
        return acc;
    }, {});

    const productSalesData = Object.keys(productSales).map((product) => ({
        product,
        quantity: productSales[product],
    }));

    // Aggregate data for sales distribution by product
    const salesDistribution = data.reduce((acc: Record<string, number>, sale: Sale) => {
        acc[sale.product] = (acc[sale.product] || 0) + sale.quantity * sale.pricePerUnit;
        return acc;
    }, {});

    const salesDistributionData = Object.keys(salesDistribution).map((product) => ({
        name: product,
        value: salesDistribution[product],
    }));

    const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
            {/* Bar Chart for Product Sales */}
            <div className="w-full lg:w-1/2 bg-white p-4 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-4">Product Sales Quantity</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={productSalesData}>
                        <XAxis dataKey="product" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="quantity" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Pie Chart for Sales Distribution */}
            <div className="w-full lg:w-1/2 bg-white p-4 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-4">Sales Distribution by Product</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={salesDistributionData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {salesDistributionData.map((_, index) => (
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

export default SalesChart;