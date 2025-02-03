import Navbar from "../../components/navbar/Navbar"
import welcomePotrait from "../../assets/images/welcome-potrait.jpg"
import Tracking from "../../assets/images/tracking.jpg"
import Management from "../../assets/images/management.webp"
import Inventory from "../../assets/images/inventory.jpg"
import Visualization from "../../assets/images/visualization.avif"
import Reports from "../../assets/images/reports.jpg"
import Support from "../../assets/images/support.jpg"

const Welcome = () => {
    return (
        <div>
            <Navbar />
            <div className="hero min-h-[70vh] bg-base-200 ">
                <div className="hero-content flex-col lg:flex-row justify-between items-center container mx-auto px-4">
                    <div className="text-center lg:text-left lg:max-w-lg pr-0 lg:pr-16">
                        <h1 className="text-5xl lg:text-6xl font-bold text-blue-600">Welcome to DairyCream</h1>
                        <p className="py-6 text-lg lg:text-xl text-gray-700">
                            DairyCream is a comprehensive dairy management system designed to help farmers boost their productivity by tracking milk production, sales, inventory management, and visualization. Join us to streamline your dairy operations and achieve greater efficiency.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                    <div>
                        <img src={welcomePotrait} className="max-w-xs lg:max-w-2xl rounded-lg shadow-2xl lg:mt-0" alt="Welcome" />
                    </div>

                </div>
            </div>
            <div className="bg-white py-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Our Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="card bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img src={Tracking} alt="Milk Production" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Milk Production Tracking</h2>
                                <p>Monitor and record daily milk production to optimize your dairy operations.</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img src={Management} alt="Sales Management" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Sales Management</h2>
                                <p>Keep track of your sales and revenue with our easy-to-use sales management tools.</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img src={Inventory} alt="Inventory Management" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Inventory Management</h2>
                                <p>Manage your inventory efficiently to ensure you never run out of essential supplies.</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img src={Visualization} alt="Data Visualization" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Data Visualization</h2>
                                <p>Visualize your data with our powerful tools to make informed decisions.</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img src={Reports} alt="Reports" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Comprehensive Reports</h2>
                                <p>Generate detailed reports to analyze your dairy farm's performance.</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img src={Support} alt="Support" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">24/7 Support</h2>
                                <p>Get round-the-clock support to ensure your operations run smoothly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome