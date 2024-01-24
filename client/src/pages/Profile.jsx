import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import {
    deleteUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    updateUserFailed,
    updateUserStart,
    updateUserSuccess
} from '../redux/user/userSlice';

const Profile = () => {

    const { currentUser, loading, error } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [image, setImage] = useState(undefined)
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(null);
    const [formData, setFormData] = useState({})

    const [updateSuccess, setUpdateSuccess] = useState(false)

    const fileRef = useRef(null)
    useEffect(() => {
        if (image) {
            handleFileUpload(image)
        }
    }, [image])

    const handleFileUpload = async image => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred /
                    snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done')
                setImagePercent(Math.round(progress))
            }
            , (error) => {
                setImageError(true)
            }
            , () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                    downloadURL => {
                        setFormData({
                            ...formData, profilePicture: downloadURL
                        });
                    }
                )
            }
        )
    }

    const handleChange = (e) => {
        const updatingUser = { ...formData, [e.target.id]: e.target.value }
        setFormData(updatingUser)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(updateUserStart())
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailed(data))
                return
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true)
        }
        catch (error) {
            dispatch(updateUserFailed(error));
        }
    }

    const handleDeleteAccount = async () => {
        try {
            dispatch(deleteUserStart())
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailed(data))
                return;
            }
            dispatch(deleteUserSuccess(data));
        }
        catch (error) {
            dispatch(deleteUserFailed(error))
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>
                Profile
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

                <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept='image/*'
                    onChange={(e) => setImage(e.target.files[0])} />
                <img
                    className='h-24 w-24 self-center cursor-pointer rounded-full object-cover'
                    src={formData.profilePicture || currentUser.profilePicture}
                    alt='profile'
                    onClick={() => fileRef.current.click()} />

                <p className=' text-sm self-center'>
                    {imageError ? (
                        <span className=' text-red-700'>
                            Failed to upload image (file size must be less than 2 MB)
                        </span>
                    ) : imagePercent > 0 && imagePercent < 100 ? (
                        <span className='text-slate-700'>
                            {`Uploading: ${imagePercent}%`}
                        </span>
                    ) : imagePercent === 100 ? (
                        <span className='text-green-600'>Image uploaded successfully
                        </span>
                    ) : (
                        ''
                    )}
                </p>

                <input
                    defaultValue={currentUser.username}
                    type='text'
                    id='username'
                    placeholder='Username'
                    className='bg-slate-100 rounded-lg p-3'
                    onChange={handleChange} />

                <input
                    defaultValue={currentUser.email}
                    type='email'
                    id='email'
                    placeholder='Email'
                    className='bg-slate-100 rounded-lg p-3'
                    onChange={handleChange} />

                <input
                    type='password'
                    id='password'
                    placeholder='Password'
                    className='bg-slate-100 rounded-lg p-3'
                    onChange={handleChange} />

                <button
                    className='bg-slate-700 p-3 text-white rounded-lg hover:opacity-90 uppercase disabled:opacity-80'>
                    {loading ? 'Loading...' : 'Update'}
                </button>
            </form>
            <div className='flex justify-between mt-5'>
                <span onClick={handleDeleteAccount} className=' text-red-600 cursor-pointer hover:opacity-70'>Delete Account</span>
                <span className=' text-red-600  cursor-pointer  hover:opacity-70'>Sign Out</span>
            </div>
            <p className='text-red-700 mt-5'>
                {error && 'Something went wrong!'}
            </p>
            <p className='text-green-700 mt-5'>
                {updateSuccess && 'Your personal data is updated successfully'}
            </p>
        </div>
    )
}

export default Profile