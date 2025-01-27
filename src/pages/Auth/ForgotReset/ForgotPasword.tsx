
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = {
    email: string;
}

const schema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
})

const ForgotPasword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data)
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

                <button type='submit' className='btn btn-primary w-full mt-4'>Submit</button>
            </form>
        </div>
    )
}

export default ForgotPasword