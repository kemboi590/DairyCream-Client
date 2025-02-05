import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginAPI } from '../../../features/login/loginAPI'
import { Toaster, toast } from 'sonner'
import { loginSuccess } from '../../../features/users/userSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../../../components/navbar/Navbar'


type FormData = {
    email: string;
    password: string;
}

const schema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().required('Password is required').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
})

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginUser] = loginAPI.useLoginUserMutation()
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // console.log(data)
        try {
            // console.log("loggin in....")
            setIsLoggingIn(true)
            const response = await loginUser(data).unwrap()
            dispatch(loginSuccess(response))
            toast.success("Login successful")
            // console.log("Response data", response.token)
            setTimeout(() => {
                navigate('/')
            }, 1000)


        } catch (err: any) {
            if ((err as any).status === 401) {
                // console.log(err.data)
                toast.error(err.data)
                // console.log("Invalid credentials. Please try again.")

            } else {
                console.log("Error", err)
            }
        } finally {
            setIsLoggingIn(false)
        }
    }

    return (
        <>
            <Navbar />
            <Toaster
                toastOptions={{
                    classNames: {
                        error: 'bg-red-400',
                        success: 'text-green-400',
                        warning: 'text-yellow-400',
                        info: 'bg-blue-400',
                    },
                }} />
            <div className='card w-full max-w-lg border border-gray-300 mx-auto mt-10 lg:mt-16 p-5 shadow-lg rounded-lg '>
                <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
                    <h1 className='card-title text-2xl font-bold mb-5 text-center'>Login to your account:</h1>

                    <div className='mb-1'>
                        <label htmlFor='email' className='form-label block text-sm font-medium text-gray-700'>Email <span className='text-red-500'>*</span></label>
                        <input type='email' placeholder="Your Email" className='input input-bordered w-full mt-1' {...register("email")} />
                        <p className='text-red-500 text-sm mt-1'>{errors.email?.message}</p>
                    </div>

                    <div className='mb-1'>
                        <label htmlFor='password' className='form-label block text-sm font-medium text-gray-700'>Password <span className='text-red-500'>*</span></label>
                        <input type='password' placeholder="Your Password" className='input input-bordered w-full mt-1' {...register("password")} />
                        <p className='text-red-500 text-sm mt-1'>{errors.password?.message}</p>
                    </div>
                    <div className="form-control mt-2">
                        <button type='submit' className='btn btn-primary w-full'>
                            {isLoggingIn ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    <span className='text-text-light'>Logging in...</span>
                                </>
                            ) : (
                                <span>Login</span>
                            )}

                        </button>

                        <div className='mt-4 text-center'>
                            <p>Don't have an account? <a href='/register' className='text-blue-500 hover:underline'>Register</a></p>

                            <p className='mt-2'>Forgot your password? <Link to='/forgot-password' className='text-blue-500 hover:underline'>Forgot Password</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

