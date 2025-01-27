import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data)
    }

    return (
        <div className='card w-full max-w-lg border border-gray-300 mx-auto mt-10 lg:mt-40 p-5 shadow-lg rounded-lg '>
            <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
                <h1 className='card-title text-2xl font-bold mb-5 text-center'>Login to your account:</h1>

                <div className='mb-4'>
                    <label htmlFor='email' className='form-label block text-sm font-medium text-gray-700'>Email <span className='text-red-500'>*</span></label>
                    <input type='email' placeholder="Your Email" className='input input-bordered w-full mt-1' {...register("email")} />
                    <p className='text-red-500 text-sm mt-1'>{errors.email?.message}</p>
                </div>

                <div className='mb-4'>
                    <label htmlFor='password' className='form-label block text-sm font-medium text-gray-700'>Password <span className='text-red-500'>*</span></label>
                    <input type='password' placeholder="Your Password" className='input input-bordered w-full mt-1' {...register("password")} />
                    <p className='text-red-500 text-sm mt-1'>{errors.password?.message}</p>
                </div>

                <button type='submit' className='btn btn-primary w-full mt-4'>Login</button>
            </form>
        </div>
    )
}

