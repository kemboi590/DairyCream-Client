import { FaFacebook, FaTwitter, FaLinkedin, FaSquareInstagram } from "react-icons/fa6";

export const ContactInfo = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-lg text-gray-700 mb-4">
                You can also reach us at:
            </p>
            <p className="text-lg text-gray-700 mb-2">
                <strong>Email:</strong> kemboi.brian@outlook.com
            </p>
            <p className="text-lg text-gray-700 mb-2">
                <strong>Phone:</strong> +254 768353360
            </p>
            <p className="text-lg text-gray-700 mb-2">
                <strong>Address:</strong> 143-10300 Kerugoya-Kutus
            </p>
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        <FaFacebook size={24} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        <FaTwitter size={24} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        <FaSquareInstagram size={24} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        <FaLinkedin size={24} />
                    </a>
                </div>
            </div>
        </div>
    )
}
