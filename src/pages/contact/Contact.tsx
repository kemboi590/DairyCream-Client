import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { ContactInfo } from "./ContactInfo";

const Contact = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-white py-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Contact Us</h1>
                    <div className="flex flex-col md:flex-row space-y-8 justify-evenly ">
                        <div className="w-full md:w-[40%] ">
                            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                            <p className="text-lg text-gray-700 mb-4">
                                If you have any questions or need assistance, please fill out the form below and we will get back to you as soon as possible.
                            </p>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-gray-700">Name</label>
                                    <input type="text" className="input input-bordered w-full" placeholder="Your Name" />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Email</label>
                                    <input type="email" className="input input-bordered w-full" placeholder="Your Email" />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Message</label>
                                    <textarea className="textarea textarea-bordered w-full" placeholder="Your Message"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-full">Send Message</button>
                            </form>
                        </div>

                        <ContactInfo />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact