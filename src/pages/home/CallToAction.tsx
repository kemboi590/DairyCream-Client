import { Link } from 'react-router-dom'

export const CallToAction = () => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4">Ready to Boost Your Dairy Farm's Productivity?</h2>
                <p className="mb-8 text-lg">Join DairyCream today and take your dairy farming to the next level.</p>
                <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
            </div>
        </div>
    )
}

export default CallToAction