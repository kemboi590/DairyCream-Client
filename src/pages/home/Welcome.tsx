import Navbar from "../../components/Navbar"
import welcomePotrait from "../../assets/images/welcome-potrait.jpg"
import { Features } from "./Features"
import Benefits from "./Benefits"
import Testimonials from "./Testimonials"
import CallToAction from "./CallToAction"
import Footer from "../../components/Footer"


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
            {/* features */}
            <Features />
            {/* benefits */}
            <Benefits />
            {/* call to action */}
            <CallToAction />
            {/* testimonials */}
            <Testimonials />

            {/* footer */}
            <Footer />

        </div>
    )
}

export default Welcome