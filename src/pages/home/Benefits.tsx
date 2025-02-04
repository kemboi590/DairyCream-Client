import Productivity from "../../assets/images/Benefits/productivity.jpg"
import Sales from "../../assets/images/Benefits/sales.jpeg"
import Inventory from "../../assets/images/Benefits/inventory.jpg"
import Visualization from "../../assets/images/Benefits//visualization.jpg"
import Reports from "../../assets/images/Benefits/repots.jpg"
import Support from "../../assets/images/Benefits/techsupport.jpg"
export const Benefits = () => {

  const benefits = [
    {
      title: "Increase Productivity",
      description: "Track milk production and optimize your dairy operations to increase productivity.",
      image: Productivity
    },
    {
      title: "Manage Sales Efficiently",
      description: "Keep track of your sales and revenue with our easy-to-use sales management tools.",
      image: Sales
    },
    {
      title: "Effective Inventory Management",
      description: "Manage your inventory efficiently to ensure you never run out of essential supplies.",
      image: Inventory
    },
    {
      title: "Data Visualization",
      description: "Visualize your data with our powerful tools to make informed decisions.",
      image: Visualization
    },
    {
      title: "Comprehensive Reports",
      description: "Generate detailed reports to analyze your dairy farm's performance.",
      image: Reports
    },
    {
      title: "24/7 Support",
      description: "Get round-the-clock support to ensure your operations run smoothly.",
      image: Support
    }
  ]

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Benefits of Using DairyCream</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
             
              <div className="flex justify-start w-full border-b-2 border-gray-200 mb-4 pb-2">
                <div className="text-4xl font-bold text-blue-600">{`0${index + 1}`}</div>
              </div>

              <div className="w-52 aspect-[1/1] mb-4 rounded-full overflow-hidden">
                <img src={benefit.image} alt={benefit.title} className="object-cover w-full h-full" />
              </div>

              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-700 text-center">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Benefits