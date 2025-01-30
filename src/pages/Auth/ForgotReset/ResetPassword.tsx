import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPasswordAPI } from '../../../features/users/PasswordReset'
import { useLocation } from 'react-router-dom'
import { toast, Toaster } from 'sonner'
import { useState } from 'react'
type FormData = {
    password: string;
    confirmPassword: string;
}

const schema = yup.object().shape({
    password: yup.string().required('Password is required').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
})

export const ResetPassword = () => {
    const [isLoading, setisLoading] = useState(false)
    const location = useLocation()
    const [resetPassword] = resetPasswordAPI.useResetPasswordMutation()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    const queryParams = new URLSearchParams(location.search)
    const email = queryParams.get('email')
    const token = queryParams.get('token')

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // console.log(data)
        if (!email || !token) {
            toast.error("Invalid reset link")
            return
        }

        const requestData = {
            ...data,
            email,
            token: encodeURIComponent(token)
        }
        // console.log("token", token)
        try {
            setisLoading(true)
            // console.log("submitting....", requestData)
            const response = await resetPassword(requestData).unwrap()

            console.log("Response data:", response)
            toast.success(response.toString())

        } catch (error) {
            // console.log("Error", error)
            toast.error("Failed to reset password, contact support")
        } finally {
            setisLoading(false)
        }
    }

    return (
        <div className='card w-full max-w-lg border border-gray-300 mx-auto mt-10 lg:mt-30 p-5 shadow-lg rounded-lg'>
            <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
                <h1 className='card-title text-2xl font-bold mb-5 text-center'>Reset Password</h1>

                <div className='mb-4'>
                    <label htmlFor='password' className='form-label block text-sm font-medium text-gray-700'>Password <span className='text-red-500'>*</span></label>
                    <input type='password' placeholder="Your Password" className='input input-bordered w-full mt-1' {...register("password")} />
                    <p className='text-red-500 text-sm mt-1'>{errors.password?.message}</p>
                </div>

                <div className='mb-4'>
                    <label htmlFor='confirmPassword' className='form-label block text-sm font-medium text-gray-700'>Confirm Password <span className='text-red-500'>*</span></label>
                    <input type='password' placeholder="Confirm Password" className='input input-bordered w-full mt-1' {...register("confirmPassword")} />
                    <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword?.message}</p>
                </div>

                {/* <button type='submit' className='btn btn-primary w-full mt-4'>Reset Password</button> */}
                <div className="form-control">
                    <button type='submit' className='btn btn-primary w-full mt-1'>
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                <span className='text-text-light'>Please Wait!...</span>
                            </>
                        ) : (
                            <span>Reset Password</span>
                        )}

                    </button>
                </div>
            </form>
            <Toaster />
        </div>
    )
}

export default ResetPassword