import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { usersAPI } from '../../../features/users/usersAPI'
<<<<<<< HEAD
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'
=======
>>>>>>> a730cc699dbbb4651967ba456db08fc50fdfae28

type FormData = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  userName: yup.string().required('Username is required'),
  role: yup.string().required('Role is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
})

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [createUser, { error }] = usersAPI.useCreateUserMutation()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (error) {
      console.log("API Error", error)
      if ('data' in error && error.data) {
        console.error("Error details:", error.data)
        toast.error(typeof error.data === 'string' ? error.data : 'An error occurred')
      }
    }
  }, [error])

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("submitted data", data)
    try {
      setIsLoading(true)
      const responseText = await createUser(data).unwrap()
      const response = responseText
      console.log("Response", response)
      toast.success("Account created successfully")
    } catch (err) {
      console.error("Error", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }} />

      <div className='card w-full max-w-lg border border-gray-300 mx-auto mt-10 p-5 shadow-lg rounded-lg'>
        <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
          <h1 className='card-title text-2xl font-bold mb-5 text-center'>Create an account with us today:</h1>

          <div className='mb-4'>
            <label htmlFor='firstName' className='form-label block text-sm font-medium text-gray-700'>First Name <span className='text-red-500'>*</span></label>
            <input type='text' placeholder="Your First Name" className='input input-bordered w-full mt-1' {...register("firstName")} />
            <p className='text-red-500 text-sm mt-1'>{errors.firstName?.message}</p>
          </div>

          <div className='mb-4'>
            <label htmlFor='lastName' className='form-label block text-sm font-medium text-gray-700'>Last Name <span className='text-red-500'>*</span></label>
            <input type='text' placeholder="Your Last Name" className='input input-bordered w-full mt-1' {...register("lastName")} />
            <p className='text-red-500 text-sm mt-1'>{errors.lastName?.message}</p>
          </div>

          <div className='mb-4'>
            <label htmlFor='userName' className='form-label block text-sm font-medium text-gray-700'>Username <span className='text-red-500'>*</span></label>
            <input type='text' placeholder="Your Username" className='input input-bordered w-full mt-1' {...register("userName")} />
            <p className='text-red-500 text-sm mt-1'>{errors.userName?.message}</p>
          </div>

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

          <div className='mb-4'>
            <label htmlFor='confirmPassword' className='form-label block text-sm font-medium text-gray-700'>Confirm Password <span className='text-red-500'>*</span></label>
            <input type='password' placeholder="Confirm Password" className='input input-bordered w-full mt-1' {...register("confirmPassword")} />
            <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword?.message}</p>
          </div>

          <input type='hidden' value='User' {...register("role")} />

          <div className="form-control mt-2">
            <button type='submit' className='btn btn-primary w-full mt-4'>
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  <span className='text-text-light'>Please wait...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}

            </button>
          </div>

          {/* <button type='submit' className='btn btn-primary w-full mt-4'>Register</button> */}
        </form>
      </div>
    </>
  )
}