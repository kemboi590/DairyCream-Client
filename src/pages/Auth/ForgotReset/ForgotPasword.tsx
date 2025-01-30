
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotPasswordAPI } from '../../../features/users/PasswordReset'
import { Toaster, toast } from 'sonner'
import { clientUriDomain } from '../../../utils/ClientDomain'
import { useState } from 'react'

type FormData = {
    email: string;
}

const schema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
})

const ForgotPasword = () => {
    const [isLoading, setisLoading] = useState(false)
    const [forgotPassword] = forgotPasswordAPI.useForgotPasswordMutation()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const requestData = {
            ...data,
            clientUri: `${clientUriDomain}/forgot-password`
        }

        try {
            setisLoading(true)
            const response = await forgotPassword(requestData).unwrap()
            // console.log("Response data:", response)
            toast.success(response.toString())
        } catch (error) {
            // console.log("Error", error)
            toast.error("Failed to send password reset link, contact support")
        } finally {
            setisLoading(false)
        }
    }

    return (
        <div className='card w-full max-w-lg border border-gray-300 mx-auto mt-10 lg:mt-25 p-5 shadow-lg rounded-lg'>
            <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
                <h1 className='card-title text-2xl font-bold mb-5 text-center'>Forgot Password</h1>
                <p className='text-center text-gray-500'>
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                <div className='mb-4'>
                    <label htmlFor='email' className='form-label block text-sm font-medium text-gray-700'>Email <span className='text-red-500'>*</span></label>
                    <input type='email' placeholder="Your Email" className='input input-bordered w-full mt-1' {...register("email")} />
                    <p className='text-red-500 text-sm mt-1'>{errors.email?.message}</p>
                </div>

                {/* <button type='submit' className='btn btn-primary w-full mt-4'>Submit</button> */}
                <div className="form-control">
                    <button type='submit' className='btn btn-primary w-full mt-4'>
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                <span className='text-text-light'>Please Wait!...</span>
                            </>
                        ) : (
                            <span>Submit</span>
                        )}

                    </button>
                </div>
            </form>
            <Toaster />
        </div>
    )
}

export default ForgotPasword