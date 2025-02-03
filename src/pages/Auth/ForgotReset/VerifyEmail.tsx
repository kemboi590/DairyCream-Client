
import { Link } from 'react-router-dom'


export const VerifyEmail = () => {
    return (
        <div>

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Verify Your Email</h2>
                    <p className="text-gray-700 text-center mb-6">
                        Thank you for registering with DairyCream! To complete your registration, please verify your email address by clicking the link we sent to your email.
                    </p>
                    <div className="flex justify-center">
                        <Link to="/login" className="btn btn-primary">Go to Login</Link>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">Didn't receive the email?</p>
                        <button className="btn btn-link text-blue-600">Resend Verification Email</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail