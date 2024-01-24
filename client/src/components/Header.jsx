import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Header = () => {
    const { currentUser } = useSelector(state => state.user)
    return (
        <div className=' bg-sky-500'>
            <div
                className=' flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to="/">
                    <h1 className=' font-bold text-teal-50'>
                        Auth App
                    </h1>
                </Link>
                <ul className=' flex gap-6 text-teal-50 cursor-pointer' >
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/about">
                        <li>About</li>
                    </Link>
                    <Link to="/profile">
                        {currentUser?.profilePicture ? (
                            <img
                                className='h-7 w-7 rounded-full object-cover'
                                src={currentUser.profilePicture}
                                alt='profile'
                            />)
                            : (
                                <li>Sign In</li>
                            )
                        }

                    </Link>
                </ul>
            </div>
        </div>
    )
}
export default Header