import { useSelector } from 'react-redux'


const Profile = () => {
    const { currentUser } = useSelector(state => state.user)

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>
                Profile
            </h1>
            <form className='flex flex-col gap-5'>
                <img
                    className='h-24 w-24 self-center cursor-pointer rounded-full object-cover'
                    src={currentUser.profilePicture}
                    alt='profile' />
                <input defaultValue={currentUser.username} type='text' id='username' placeholder='Username'
                    className='bg-slate-100 rounded-lg p-3' />
                <input defaultValue={currentUser.email} type='email' id='email' placeholder='Email'
                    className='bg-slate-100 rounded-lg p-3' />
                <input type='password' id='password' placeholder='Password'
                    className='bg-slate-100 rounded-lg p-3' />
                <button
                    className='bg-slate-700 p-3 text-white rounded-lg hover:opacity-90 uppercase disabled:opacity-80'>
                    Update
                </button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className=' text-red-600 cursor-pointer hover:opacity-70'>Delete Account</span>
                <span className=' text-red-600  cursor-pointer  hover:opacity-70'>Sign Out</span>
            </div>
        </div>
    )
}

export default Profile