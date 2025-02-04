import Tracking from "../../assets/images/features/tracking.jpg"
import Management from "../../assets/images/features/management.webp"
import Inventory from "../../assets/images/features/inventory.jpg"
import Visualization from "../../assets/images/features/visualization.avif"
import Reports from "../../assets/images/features/reports.jpg"
import Support from "../../assets/images/features/support.jpg"

export const Features = () => {
    const features = [
        {
            title: "Milk Production Tracking",
            description: "Monitor and record daily milk production to optimize your dairy operations. This feature helps you track the milk production of individual cows and the entire herd.",
            image: Tracking
        },
        {
            title: "Sales Management",
            description: "Keep track of your sales and revenue with our easy-to-use sales management tools. This feature helps you manage your customers, sales, and payments efficiently.",
            image: Management
        },
        {
            title: "Inventory Management",
            description: "Manage your inventory efficiently to ensure you never run out of essential supplies. This feature helps you track your feed, medicine, and other supplies.",
            image: Inventory
        },
        {
            title: "Data Visualization",
            description: "Visualize your data with our powerful tools to make informed decisions. You can generate graphs and charts to analyze your dairy farm's performance.",
            image: Visualization
        },
        {
            title: "Comprehensive Reports",
            description: "Generate detailed reports to analyze your dairy farm's performance. This feature helps you track your milk production, sales, and expenses.",
            image: Reports
        },
        {
            title: "24/7 Support",
            description: "Get round-the-clock support to ensure your operations run smoothly. Our support team is available to help you with any issues or questions.",
            image: Support
        }
    ]

    return (
        <div className="bg-white py-10">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="card bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img src={feature.image} alt={feature.title} className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <div className="flex justify-start w-full border-b-2 border-gray-200 mb-4 pb-2">
                                    <h2 className="card-title">{feature.title}</h2>
                                </div>

                                <p className='text-gray-700 text-center text-lg'>
                                    {feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Features