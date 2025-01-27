import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data)
    }

    return (
        <div className='card w-full max-w-lg border border-gray-300 mx-auto mt-10 p-5 shadow-lg rounded-lg'>
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

                <button type='submit' className='btn btn-primary w-full mt-4'>Reset Password</button>
            </form>
        </div>
    )
}

export default ResetPassword