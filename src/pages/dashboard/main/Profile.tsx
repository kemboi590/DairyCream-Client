import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RootState } from '../../../app/store';
import { usersAPI } from '../../../features/users/usersAPI';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'sonner';
import Footer from '../../../components/Footer';
import UserIMG from '../../../assets/images/testomonials/user.jpg';

type UserFormData = {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    role: string;
};

const schema = yup.object().shape({
    id: yup.string().required('ID is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    userName: yup.string().required('Username is required'),
    role: yup.string().required('Role is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
});

const Profile = () => {
    const user = useSelector((state: RootState) => state.user);
    const role = user.user?.role;
    const id = user.user?.id;

    const { data: userData, isLoading, error, refetch } = usersAPI.useGetUserByIdQuery(id as string, {
        skip: !id,
        refetchOnMountOrArgChange: true
    });

    const [updateUser] = usersAPI.useUpdateUserMutation();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false); // loader

    const { register, handleSubmit, formState: { errors }, reset } = useForm<UserFormData>({
        resolver: yupResolver(schema),
    });

    useEffect(() => { // Populate form fields
        if (userData) {
            reset({
                id: userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                userName: userData.userName,
                email: userData.email,
                role: userData.role,
            });
        }
    }, [userData, reset]);

    const onSubmit: SubmitHandler<UserFormData> = async (formData) => {
        console.log('Form data:', formData); // Log form data
        try {
            setIsUpdating(true);
            const response = await updateUser(formData).unwrap();
            console.log('Update response:', response); // Log response
            setIsEditMode(false);
            refetch();
            toast.success('User updated successfully');
        } catch (err) {
            console.error('Error updating user', err);
            toast.error('Error updating user');
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading user data.</div>;
    }

    if (!userData) {
        return <div>No user data available.</div>;
    }

    return (
        <>

            <div className="card shadow-xl mx-auto p-8 rounded-md bg-slate-200">
                <div className="border-b-2 border-slate-600 pb-8">
                    <div className="flex justify-center">
                        <img src={UserIMG} className="rounded-full h-32 w-32 object-cover border-4 border-white shadow-lg" alt="User Avatar" />
                    </div>
                    <div className="flex flex-col justify-center mt-6 text-center">
                        <h1 className="text-4xl font-bold text-blue-600">{userData.firstName + " " + userData.lastName}</h1>
                        <p className="text-lg text-gray-700 mt-2">Email: {userData.email}</p>
                        <p className="text-lg text-gray-700">Username: {userData.userName}</p>
                        <p className="text-lg text-gray-700">Role: {userData.role}</p>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button onClick={() => setIsEditMode(true)} className="btn bg-blue-600 text-white hover:bg-blue-700 ">Update Profile</button>
                </div>

                {isEditMode && (
                    <div className="fixed inset-0 flex items-center justify-center bg-slate-200 bg-opacity-50 z-50 ">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="form-control">
                                    <label htmlFor="firstName" className="label">First Name</label>
                                    <input type="text" id="firstName" className="input input-bordered" {...register("firstName")} />
                                    <p className="text-red-500">{errors.firstName?.message}</p>
                                </div>
                                <div className="form-control">
                                    <label htmlFor="lastName" className="label">Last Name</label>
                                    <input type="text" id="lastName" className="input input-bordered" {...register("lastName")} />
                                    <p className="text-red-500">{errors.lastName?.message}</p>
                                </div>
                                <div className="form-control">
                                    <label htmlFor="userName" className="label">Username</label>
                                    <input type="text" id="userName" className="input input-bordered" {...register("userName")} />
                                    <p className="text-red-500">{errors.userName?.message}</p>
                                </div>

                                <div className="mt-6 flex justify-around">
                                    <button onClick={() => setIsEditMode(false)} className="btn bg-red-500 text-white hover:bg-red-600">Cancel</button>
                                    <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">
                                        {isUpdating ? (
                                            <>
                                                <span className="loading loading-spinner text-white"></span>
                                                <span className='text-white'>Updating...</span>
                                            </>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                <Toaster />

            </div>
            <Footer />
        </>


    );
};

export default Profile;