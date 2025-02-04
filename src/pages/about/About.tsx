import healthCows from "../../assets/images/about/healthy cows.jpeg"
import milkInGlass from "../../assets/images/about/milk in a glass.jpg"
import FarmerStoreMilk from "../../assets/images/about/a farmer storing milk in containers.jpg"
import milSaleSupermarket from "../../assets/images/about/milk sale in supermarket.webp"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/navbar/Footer"

export const About = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-white py-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">About DairyCream</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <img src={healthCows} alt="Healthy Cows" className="rounded-lg shadow-lg" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                            <p className="text-lg text-gray-700">
                                At DairyCream, our mission is to empower dairy farmers with the tools they need to boost productivity, manage their operations efficiently, and achieve greater success. We are committed to providing innovative solutions that make dairy farming easier and more profitable.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="order-2 md:order-1 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                            <p className="text-lg text-gray-700">
                                Our vision is to be the leading provider of dairy management solutions, helping farmers around the world to optimize their operations and achieve sustainable growth. We strive to create a future where dairy farming is more efficient, productive, and environmentally friendly.
                            </p>
                        </div>
                        <div className="order-1 md:order-2">
                            <img src={milkInGlass} alt="Milk in a Glass" className="rounded-lg shadow-lg" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <img src={FarmerStoreMilk} alt="Farmer Storing Milk" className="rounded-lg shadow-lg" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
                            <p className="text-lg text-gray-700">
                                At DairyCream, we value innovation, integrity, and customer satisfaction. We are dedicated to providing high-quality products and services that meet the needs of our customers. Our team is passionate about making a positive impact on the dairy farming industry and helping farmers succeed.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="order-2 md:order-1 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-4">Our Commitment</h2>
                            <p className="text-lg text-gray-700">
                                We are committed to continuous improvement and innovation. Our team works tirelessly to develop new features and enhancements that make DairyCream the best dairy management solution available. We listen to our customers and strive to exceed their expectations.
                            </p>
                        </div>
                        <div className="order-1 md:order-2">
                            <img src={milSaleSupermarket} alt="Milk Sale in Supermarket" className="rounded-lg shadow-lg" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About